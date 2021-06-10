
const Product = require('../models/ProductModel');
const StoreModel = require('../models/StoreModel');
const fs = require("fs")
let cloudinary = require('cloudinary').v2;
const UserModel = require('../models/UserModel');

cloudinary.config({
    cloud_name: 'clickabuy',
    api_key: process.env.CLOUDINNARY_API_KEY,
    api_secret: process.env.CLOUDINNARY_API_SECRET
});

const respondFrontend = (res, response, error) => {
    res.json({
        success: !error ? true : false,
        response,
        error
    })
}

const populateOneDocument = async (document) => {

    let retorno = await document
        .populate({ path: 'storeId'})
        
        .execPopulate();
    return retorno;

}
const populateArrayDocuments = async (documents) => {
    const opts = [
        { path: 'storeId'}
    ];
    let retorno = await RequestCreateStoreModel.populate(documents, opts);
    return retorno;
}



const errorBackend = "error 500 , avisar al  team backend";
const errorProductNotFound = "error: Product not found";

const validationStore = async (idStore, user) => {
    const store = await StoreModel.findById(idStore);
    if (!store) throw new Error("this Store doesn't exist")

    userExist = store.owners.find(idUser => idUser.toString() === user._id.toString())
    if (!userExist && user.role !== "adminApp") throw new Error("this user is not Authorizated to modify the Store " + store.nameStore)

    return store
}

const getPathAndNameFile = (product, file, folderName) => {
    let extensionImg = file.name.split(".")[file.name.split(".").length - 1];
    let fileName = `${product.nameProduct}-${product._id}.${extensionImg}`;
    let filePath = `${__dirname}/../frontend/public/assets/${folderName}/${fileName}`;
    return { filePath, fileName }
}


const productControllers = {
    addProduct: async (req, res) => {
        let response, error;
        let user = req.user;
        let { description, price, stock, nameProduct, storeId } = req.body;
        let { productImg } = req.files;

        try {
            let objProductImg = { url: "", publicId: "" };
            await validationStore(storeId, user)
            let newProduct = new Product({ nameProduct, productImg, stock, price, description, storeId });

            const image = getPathAndNameFile(newProduct, productImg, "fotosAHostear");
            await productImg.mv(image.filePath);
            let productImgHost = await cloudinary.uploader.upload(image.filePath);

            fs.unlink(image.filePath, (err) => err && console.log(err));



            objProductImg.url = productImgHost.url;
            objProductImg.publicId = productImgHost.public_id;

            newProduct.productImg = objProductImg;

            await newProduct.save();
            response = newProduct;
        } catch (err) {
            console.log(err);
            error = "error missing required fields " + err.message;
        }
        respondFrontend(res, response, error);
    },

    getAllProducts: async (req, res) => {
        let response, error;
        try {
            response = await Product.find().populate({ path: "reviews", populate: { path: "userId", select: { "firstName": 1, "lastName": 1, "email": 1 } } })
            //.populate("storeId")
        } catch (err) {
            console.log(err);
            error = errorBackend;
        }
        respondFrontend(res, response, error);
    },
    getProductById: async (req, res) => {
        const id = req.params.id;
        let response, error;
        try {
            let product = await Product.findById(id);
            product || (error = errorProductNotFound)
            response = await populateOneDocument(product)
        } catch (err) {
            console.log(err);
            error = errorBackend;
        }
        
        respondFrontend(res, response, error);
    },
    updateProduct: async (req, res) => {
        const idProduct = req.params.id;
        let { description, price, stock, nameProduct, storeId } = req.body;
        let productImg;
        let user = req.user;
        let response, error;
        try {
            await validationStore(storeId, user);
            const product = await Product.findById(idProduct);
            let objProductImg = product.productImg;

            if (!product) throw new Error("this product doesn't exist");
            if (product.storeId.toString() !== storeId) throw new Error("Not Authorizated, the product does not belong to the store")

            if (req.files) {
                productImg = req.files.productImg
                await cloudinary.api.delete_resources([product.productImg.publicId]);
                const image = getPathAndNameFile(product, productImg, "fotosAHostear");
                await productImg.mv(image.filePath);
                let productImgHost = await cloudinary.uploader.upload(image.filePath);
                fs.unlink(image.filePath, (err) => err && console.log(err));
                objProductImg.url = productImgHost.url;
                objProductImg.publicId = productImgHost.public_id;
            }

            let fieldsObj = { description, price, stock, productImg: objProductImg, nameProduct };
            let update = {};
            for (const field in fieldsObj) {
                if (fieldsObj[field])
                    update[field] = fieldsObj[field];
            }
            response = await Product.findByIdAndUpdate(idProduct, update, { new: true });

        } catch (err) {
            console.log(err);
            error = err.name + " " + err.message;
        }
        console.log(response)
        respondFrontend(res, response, error);
    },
    deleteProduct: async (req, res) => {
        const idProduct = req.params.id;
        let { storeId } = req.body;
        let user = req.user;
        let response, error;
        try {
            await validationStore(storeId, user);
            const product = await Product.findById(idProduct);

            if (!product) throw new Error("this product doesn't exist");
            if (product.storeId.toString() !== storeId) throw new Error("Not Authorizated, the product does not belong to the store")
            await cloudinary.api.delete_resources([product.productImg.publicId]);
            response = await Product.findByIdAndDelete(idProduct);
        } catch (err) {
            console.log(err);
            error = err.name + " " + err.message;
        }
        respondFrontend(res, response, error);
    },
    getProductsFromStore: async (req, res) => {
        const id = req.params.id
        let response;
        let error;
        try {
            const productsFromStore = await Product.find({ storeId: id }).populate({ path: "reviews", populate: { path: "userId", select: { "firstName": 1, "lastName": 1, "email": 1 } } })
            response = productsFromStore
        } catch (error) {
            error = 'An error has occurred on the server, try later!'
        }
        res.json({ success: !error ? true : false, response, error })
    },
    getProductFromCartLS: async (req, res) => {
        let error, response;
        let { cartLS } = req.body;

        try {
            response = await Promise.all(cartLS.map(async (item) => {
                let product = await Product.findById(item._id);
                let newItem = {
                    ...product.toObject(),
                    quantity: parseInt(item.quantity) > product.stock ? product.stock : parseInt(item.quantity)
                }
                return newItem
            }))
            if (!response) throw new Error("response is undefined")

        } catch (err) {
            console.log(err)
            error = `${err.name}: ${err.message}`
        }
        respondFrontend(res, response, error);
    },
    productsLiked: async (req, res) => {
        const userEmail = req.user.email
        const idProduct = req.body.idProduct
        try {
            const product = await Product.findOne({ _id: idProduct, "userLiked": userEmail })
            if (!product) {
                const likeProduct = await Product.findOneAndUpdate({ _id: idProduct }, { $push: { userLiked: userEmail } }, { new: true })
                res.json({ success: true, response: likeProduct })
            } else {
                const deslikeProduct = await Product.findOneAndUpdate({ _id: idProduct }, { $pull: { userLiked: userEmail } }, { new: true })
                res.json({ success: true, response: deslikeProduct })
            }
        } catch (error) {
            res.json({ success: false, respuesta: 'An error has occurred on the server, try later!' })
        }
    },
    getAllReviews: async (req, res) => {
        const productId = req.params.id
        try {
            const allReviews = await Product.findById(productId).populate({ path: "reviews", populate: { path: "userId", select: { "email": 1 } } })
            res.json({ response: allReviews, success: true })
        } catch (error) {
            res.json({ response: 'An error has occurred on the server, try later!', success: false })
        }
    },
    addReviews: async (req, res) => {
        const productId = req.params.id
        try {
            const addReview = await Product.findOneAndUpdate({ _id: productId },
                { $push: { reviews: { ...req.body, userId: req.user._id } } }, { new: true }).populate({ path: "reviews", populate: { path: "userId", select: { "firstName": 1, "lastName": 1, "email": 1 } } })
            res.json({ response: addReview, success: true })
        } catch (error) {
            res.json({ response: 'An error has occurred on the server, try later!', success: false })
        }
    },
    editReviews: async (req, res) => {
        const productId = req.params.id
        const review = req.body.review
        const idReview = req.body.idReview
        try {
            const editReviews = await Product.findOneAndUpdate({ _id: productId, "reviews._id": idReview },
                { $set: { "reviews.$.review": review } }, { new: true }).populate({ path: "reviews", populate: { path: "userId", select: { "firstName": 1, "lastName": 1, "email": 1 } } })
            res.json({ response: editReviews, success: true })
        } catch (error) {
            res.json({ response: 'An error has occurred on the server, try later!', success: false })
        }
    },
    deleteReviews: async (req, res) => {
        const productId = req.params.id
        const idReview = req.body.idReview
        try {
            const deleteReview = await Product.findOneAndUpdate({ _id: productId, "reviews._id": idReview }, { $pull: { reviews: { _id: idReview } } }, { new: true })

            res.json({ response: deleteReview, success: true })
        } catch (error) {
            res.json({ response: 'An error has occurred on the server, try later!', success: false })
        }
    },

    rateProduct: async (req, res) => {
        let response, error;
        const idProduct = req.params.id;
        const user = req.user;

        try {
            checkRatedStore = await Product.findOne({ _id: idProduct, usersRated: [user._id] })
            response = await Product.findOneAndUpdate({ _id: idProduct }, { $push: { rateProduct: { vote: req.body.numberRate, userId: user._id } }, usersRatedProduct: user._id }, { new: true })
            if (!checkRatedStore) {
                await UserModel.findOneAndUpdate({ _id: user._id }, { $push: { productsRated: idProduct } })
            } else {
                console.log('ya lo votaste')
            }
        } catch (err) {
            error = `${err.name} : ${err.message}`
            console.log(err)
        }

        // res.json({ success: !error ? true : false, response, error })
    },

    /*payCart: async (req, res) => {
        let response, error;
        const user = req.user;
        const {cart} = req.body;
        let corruptProductsStocks = [];
        try {
            
            response = await Promise.all(cart.filter(async (item) => {
                let product = await Product.findById(item._id);
                if(product.stock < item.quantity)
                    return {...product,quantity: item.quantity}
            }))


            if (!response) throw new Error("response is undefined")
                
            });
        } catch (err) {
            console.log(err)
            error = `${err.name}: ${err.message}`            
        }

        respondFrontend(res, response, error);

    }*/



}


module.exports = productControllers;
