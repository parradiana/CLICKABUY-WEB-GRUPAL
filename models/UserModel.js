const mongoose = require ('mongoose');

const userSchema = new mongoose.Schema({
    password:{type: String, required: true},
    firstName:{type: String, required: true},
    lastName:{type: String, required: true},
    userImg:{url:{type: String},publicId:{type: String}},
    role : {type:String,default:"commonUser",enum: ['commonUser', 'adminStores','adminApp']}, //roles: commonUser,adminStores,adminApp
    email:{type: String, required: true},
    loggedWithGoogle: {type: Boolean , default: false},
    storesRated: [String], 
    productsRated: [String], 
})

const User = mongoose.model('user',userSchema);

module.exports = User;