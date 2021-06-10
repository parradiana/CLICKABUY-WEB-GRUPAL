const StoreModel = require('../models/StoreModel')
const CategoryModel = require('../models/CategoryModel')
const ProductModel = require('../models/ProductModel')
const UserModel = require('../models/UserModel')
const fs = require("fs")
let cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'clickabuy', 
    api_key: process.env.CLOUDINNARY_API_KEY, 
    api_secret: process.env.CLOUDINNARY_API_SECRET
});


const getPathAndNameFile = (store, file, folderName) => {
    let extensionImg = file.name.split(".")[file.name.split(".").length - 1];
    let fileName = `${store.nameStore}-${store._id}.${extensionImg}`;
    let filePath = `${__dirname}/../frontend/public/assets/${folderName}/${fileName}`;

    return { filePath, fileName }
}

const validationStore = async (idStore, user) => {
    const store = await StoreModel.findById(idStore);
    if (!store) throw new Error("this Store doesn't exist")

    userExist = store.owners.find(idUser => idUser.toString() === user._id.toString())
    
    if (!userExist && user.role!== "adminApp") throw new Error("this user is not Authorizated to modify the Store " + store.nameStore)

    return store
}

const storeControllers = {
    getAllStores: async (req, res) => {
        let response;
        let error;
        try {
            const allStores = await StoreModel.find()
            response = allStores
        } catch (err) {
            error = 'An error has occurred on the server, try later!'
        }
        res.json({ success: !error ? true : false, response, error })
    },
    getStoreFromId: async (req, res) => {
        const id = req.params.id
        let response;
        let error;
        try {
            const singleStore = await StoreModel.findById(id)
            response = singleStore
        } catch (err) {
            error = `${err.name} : ${err.message}`
            console.log(err)
        }
        res.json({ success: !error ? true : false, response, error })
    },
    editStore: async (req, res) => {
        const idStore = req.params.id;
        const user = req.user;
        let { nameStore, description, category } = req.body;
        let storeHero, logoStore;
        if (req.files) {
            storeHero = req.files.storeHero;
            logoStore = req.files.logoStore;
        }
        let response, error;
        try {
            
            let store = await validationStore(idStore, user);
            nameStore && (store.nameStore = nameStore);

            let objLogoStore = store.logoStore;
            let objStoreHero = store.storeHero;

            if (storeHero) {
                await cloudinary.api.delete_resources([store.storeHero.publicId]);
                const hero = getPathAndNameFile(store, storeHero, "fotosAHostear");
                await storeHero.mv(hero.filePath);
                let storeHeroHost = await cloudinary.uploader.upload(hero.filePath);
                fs.unlink(hero.filePath, (err) => err && console.log(err));

                objStoreHero.url = storeHeroHost.url;
                objStoreHero.publicId = storeHeroHost.public_id;
            }
            if (logoStore) {
                await cloudinary.api.delete_resources([store.logoStore.publicId]);
                const logo = getPathAndNameFile(store, logoStore, "fotosAHostear");
                await logoStore.mv(logo.filePath);
                
                let logoStoreHost = await cloudinary.uploader.upload(logo.filePath);
                fs.unlink(logo.filePath, (err) => err && console.log(err));

                objLogoStore.url = logoStoreHost.url;
                objLogoStore.publicId = logoStoreHost.public_id;

            }
            if (category) {
                category = await CategoryModel.findOne({ nameCategory: category });
                if (!category) throw new Error("this category doesn't exist");
            }

            let fieldsObj = { nameStore,  description, category, logoStore : objLogoStore,storeHero :objStoreHero}
            let update = {}
            for (const field in fieldsObj) {
                if (fieldsObj[field]) {
                    update[field] = fieldsObj[field];
                }
            }

            
            response = await StoreModel.findOneAndUpdate({ _id: idStore }, update, { new: true })
        } catch (err) {
            error = `${err.name} : ${err.message}`
            console.log(err)
        }
        // console.log(response)
        res.json({ success: !error ? true : false, response, error })
    },
    deleteStore: async (req, res) => {
        const idStore = req.params.id
        let response, error;
        let user = req.user
        try {

            let store = await validationStore(idStore, user);
            let productOfStore = await ProductModel.find({ storeId: idStore });
            await Promise.all(productOfStore.map(async (product) => {
                await cloudinary.api.delete_resources([product.productImg.publicId]);
                await ProductModel.findByIdAndDelete(product._id);
            }))

            await cloudinary.api.delete_resources([store.logoStore.publicId,store.storeHero.publicId]);
            response = await StoreModel.findByIdAndDelete(idStore)
        } catch (err) {
            error = `${err.name} : ${err.message}`
            console.log(err)
        }
        res.json({ success: !error ? true : false, response, error })
    },

    getStoresByCategory: async (req, res) => {
        const idCategory = req.params.id
        let response;
        let error;
        try {
            const groupOfStores = await StoreModel.find({ category: idCategory })
            response = groupOfStores
        } catch (error) {
            error = 'An error has occurred on the server, try later!'
        }
        res.json({ success: !error ? true : false, response, error })
    },

    modifyOwnerOfStore: async (req, res) => {

        let response, error;
        const idStore = req.params.id;
        const user = req.user;

        const { emailOtherUser, action } = req.body;
        let querySelector;
        let updateOperator;
        try {
            let store = await validationStore(idStore, user);
            let otherUser = await UserModel.findOne({ email: emailOtherUser });
            if (!otherUser) throw new Error("email not registered")
            if (user.email === emailOtherUser) throw new Error("You can't do this")


            switch (action) {
                case "addOwner":
                    if (store.owners.find(owner => owner._id.toString() === otherUser._id.toString()))
                        throw new Error(`the user with the email : ${emailOtherUser} is already owner`)
                    querySelector = { _id: idStore };
                    updateOperator = { $push: { owners: otherUser._id } };
                    break;
                case "deleteOwner":
                    querySelector = { _id: idStore };
                    updateOperator = { $pull: { owners: otherUser._id } }; //$pull : camino donde se encuentra el array : {condicion para el borrar elementos}
                    break;
                default:
                    error = "unknown action on modificyOwnerOfStore : " + action;
                    return res.json({ success: false, response, error })
            }
            response = await StoreModel.findOneAndUpdate(querySelector, updateOperator, { new: true })

        } catch (err) {
            error = `${err.name} : ${err.message}`
            console.log(err)
        }
        res.json({ success: !error ? true : false, response, error })
    },
    getStoresUser: async (req, res) => {
        let response, error;
        const user = req.user;

        try {
            response = await StoreModel.find({ owners: user._id })
        } catch (err) {
            error = `${err.name} : ${err.message}`
            console.log(err)
        }
        res.json({ success: !error ? true : false, response, error })
    },

    rateStore: async (req, res) => {
        let response, error;
        const idStore = req.params.id;
        const user = req.user;

        try {
            checkRatedStore = await StoreModel.findOne({ _id: idStore, usersRated: [user._id] })
            response = await StoreModel.findOneAndUpdate({ _id: idStore }, { $push: { rate: { vote: req.body.numberRate, userId: user._id } }, usersRated: user._id }, { new: true })
            if (!checkRatedStore) {
                await UserModel.findOneAndUpdate({ _id: user._id }, { $push: { storesRated: idStore } })
            } else {
                console.log('ya lo votaste')
            }
        } catch (err) {
            error = `${err.name} : ${err.message}`
            console.log(err)
        }

        res.json({ success: !error ? true : false, response, error })
    },

}
module.exports = storeControllers
