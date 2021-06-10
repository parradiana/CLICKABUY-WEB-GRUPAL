
const CategoryModel = require('../models/CategoryModel')
const StoreModel = require('../models/StoreModel')
const fs = require("fs")
let cloudinary = require('cloudinary').v2;
const RequestCreateStoreModel = require('../models/RequestCreateStoreModel');
const UserModel = require('../models/UserModel')

cloudinary.config({ 
    cloud_name: 'clickabuy', 
    api_key: process.env.CLOUDINNARY_API_KEY, 
    api_secret: process.env.CLOUDINNARY_API_SECRET
});

const getPathAndNameFile = (document, file, folderName) => {
    let extensionImg = file.name.split(".")[file.name.split(".").length - 1];
    let fileName = `${document.nameStore}-${document._id}.${extensionImg}`;
    let filePath = `${__dirname}/../frontend/public/assets/${folderName}/${fileName}`;

    return { filePath, fileName }
}

const populateOneDocument = async (document) => {

    let retorno = await document
        .populate({ path: 'userOfRequest', select: '-_id -password' })
        .populate({ path: 'category'})
        //.populate({ path: 'answeredByUser', select: '-_id -password' })
        .execPopulate();
    return retorno;

}
const populateArrayDocuments = async (documents) => {
    const opts = [
        { path: 'userOfRequest', select: '-_id -password' },
        { path: 'category', },
        //{ path: 'answeredByUser', select: '-_id -password' },
    ];
    let retorno = await RequestCreateStoreModel.populate(documents, opts);
    return retorno;
}


const requestCreateStoreControllers = {
    getAllRequestCreateStore: async (req, res) => {
        let response, error;
        let user = req.user;

        try {
            if (user.role !== "adminApp") throw new Error("Unauthorized user");
            const allRequest = await RequestCreateStoreModel.find().populate('userOfRequest');
            response = await populateArrayDocuments(allRequest);
        } catch (err) {
            console.log(err);
            error = `${err.name} : ${err.message}`
        }
        res.json({ success: !error ? true : false, response, error })
    },

    addRequestCreateStore: async (req, res) => {
        let response, error;
        let { idCategory,nameStore,description } = req.body;
        let { logoStore } = req.files;
        let user = req.user;

        if(!idCategory || !nameStore || !description || !logoStore ){
            error = ("some fields are required "
                + "\n idCategory: " +idCategory
                + "\n nameStore: " +nameStore
                + "\n logoStore: " +logoStore
                + "\n description: " +description
            )
            res.json({ success: !error ? true : false, response, error })
        } 
            

        try {
            let objLogoStore = { url: "", publicId: "" };
            let category = await CategoryModel.findById(idCategory);
            if (!category) throw new Error("this category doesn't exist");
            
            let newRequest = new RequestCreateStoreModel({nameStore,description,category:idCategory });
            
            const logo = getPathAndNameFile(newRequest, logoStore, "fotosAHostear");
            await logoStore.mv(logo.filePath);
            let logoHost = await cloudinary.uploader.upload(logo.filePath);
            fs.unlink(logo.filePath, (err) => err && console.log(err));

            objLogoStore.url = logoHost.url;
            objLogoStore.publicId = logoHost.public_id;
            newRequest.logoStore = objLogoStore;
            newRequest.userOfRequest = user._id;

            await newRequest.save();
            response = await populateOneDocument(newRequest);
        } catch (err) {
            error = `${err.name} : ${err.message}`
            console.log(err)
        }
        res.json({ success: !error ? true : false, response, error })
    },

    approveRequest: async (req, res) => {
        let response, error;
        let user = req.user
        let idRequest = req.params.id;
        try {
            if (user.role !== "adminApp") throw new Error("Unauthorized user");
            let request = await RequestCreateStoreModel.findById(idRequest);
            if(!request) throw new Error("this request dosen't exist")
            let newStore = {
                nameStore: request.nameStore,
                description: request.description,
                category: request.category,
                owners: [request.userOfRequest],
                logoStore: request.logoStore
            }
            newStore = new StoreModel(newStore);
            await newStore.save();
            //actualizar rol
            await UserModel.findByIdAndUpdate(request.userOfRequest,{role:"adminStores"})
            //let newRequest = await RequestCreateStoreModel.findByIdAndUpdate(idRequest, { status: "approved", answeredByUser: user._id })
            //response = await populateOneDocument(newRequest);
            
            response = await RequestCreateStoreModel.findByIdAndDelete(idRequest)
        } catch (err) {
            error = `${err.name} : ${err.message}`
            console.log(err)
        }
        res.json({ success: !error ? true : false, response, error })
    },
    
    rejectRequest: async (req, res) => {
        let response, error;
        let user = req.user
        let idRequest = req.params.id;
        try {
            if (user.role !== "adminApp") throw new Error("Unauthorized user");
            let request = await RequestCreateStoreModel.findById(idRequest);

            await cloudinary.api.delete_resources([request.logoStore.publicId]);
            response = await RequestCreateStoreModel.findByIdAndDelete(idRequest)
        } catch (err) {
            error = `${err.name} : ${err.message}`
            console.log(err)
        }
        res.json({ success: !error ? true : false, response, error })
    },



}
module.exports = requestCreateStoreControllers
