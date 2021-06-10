const express = require('express')
const router = express.Router()
const validator = require('../config/validator')
const passport = require("passport")
const userControllers = require('../controllers/userControllers')
const storeControllers = require('../controllers/storeControllers')
const productControllers = require('../controllers/productControllers')
const categoryControllers = require('../controllers/categoryControllers')
const requestCreateStoreControllers = require('../controllers/requestCreateStoreControllers')
const mailControllers = require('../controllers/mailControllers')
const {addUserNative, addUser, getAllUsers, getUserById, updateUser, deleteUser, loginUser, forcedLogin, userCheckRole } = userControllers
const { getAllStores, addStore, editStore, deleteStore, getStoresByCategory, modifyOwnerOfStore, getStoresUser, rateStore, getStoreFromId } = storeControllers
const { getAllCategories, getSingleCategory, addCategory, deleteCategory, modifyCategory } = categoryControllers
const { addProduct, getAllProducts, getProductById, updateProduct, deleteProduct, getProductsFromStore, getProductFromCartLS, productsLiked, addReviews, editReviews, deleteReviews, rateProduct } = productControllers
const { getAllRequestCreateStore, addRequestCreateStore, approveRequest, rejectRequest } = requestCreateStoreControllers
const { mailOrderConfirmed, mailStoreConfirmed} = mailControllers
// USER
router.route("/users")
    .get(getAllUsers)
    .post(validator, addUser)
router.route("/usersNative")
    .post(validator, addUserNative)


router.route("/login")
    .post(loginUser)

router.route("/relogin")
    .get(passport.authenticate('jwt', { session: false }), forcedLogin)

router.route("/user/:id")
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)

router.route("/userCheckRole")
    .get(passport.authenticate('jwt', { session: false }), userCheckRole)


// STORES
router.route("/stores")
    .get(getAllStores)
//.post(passport.authenticate('jwt', { session: false }), addStore)

router.route("/storesByUser")
    .get(passport.authenticate('jwt', { session: false }), getStoresUser)

router.route("/store/:id")
    .get(getStoresByCategory)
    // passport.authenticate('jwt', { session: false }),
    .put(passport.authenticate('jwt', { session: false }), editStore)
    .delete(passport.authenticate('jwt', { session: false }), deleteStore)
router.route("/getStoreFromId/:id")
    .get(getStoreFromId)
router.route("/storeRate/:id")
    .put(passport.authenticate('jwt', { session: false }), rateStore)

router.route("/modifyOwnerOfStore/:id")
    .put(passport.authenticate('jwt', { session: false }), modifyOwnerOfStore)

// CATEGORIES
router.route("/categories")
    .get(getAllCategories)
    .post(addCategory)

router.route("/category/:id")
    .get(getSingleCategory)
    .put(modifyCategory)
    .delete(deleteCategory)

// PRODUCTS
router.route("/products")
    .get(getAllProducts)
    .post(passport.authenticate('jwt', { session: false }), addProduct)

router.route("/product/:id")
    .get(getProductById)
    .put(passport.authenticate('jwt', { session: false }), updateProduct)
    .post(passport.authenticate('jwt', { session: false }), deleteProduct) 
    // .post( deleteProduct) 

router.route("/productRate/:id")
    .put(passport.authenticate('jwt', { session: false }), rateProduct)

router.route("/likeproduct")
    .put(passport.authenticate('jwt', { session: false }), productsLiked)

router.route("/productsFromStore/:id")
    .get(getProductsFromStore)

router.route("/reloadCartLS")
    .post(getProductFromCartLS)

router.route('/reviews/:id')
    .post(passport.authenticate('jwt', { session: false }), addReviews)
    .put(editReviews)
    .delete(deleteReviews)


router.route("/request")
    .get(passport.authenticate('jwt', { session: false }), getAllRequestCreateStore)
    .post(passport.authenticate('jwt', { session: false }), addRequestCreateStore)

router.route("/respondRequest/:id")
    .post(passport.authenticate('jwt', { session: false }), approveRequest)
    .delete(passport.authenticate('jwt', { session: false }), rejectRequest)

router.route('/orderconfirmed')
    .post(mailOrderConfirmed)

router.route('/storeconfirmed')
    .post(mailOrderConfirmed)

module.exports = router