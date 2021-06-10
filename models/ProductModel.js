const mongoose = require ('mongoose');

const productSchema = new mongoose.Schema({
    nameProduct:{type: String, required: true},
    productImg:{url:{type: String},publicId:{type: String}},
    description:{type: String,required:true},
    price:{type: Number, required: true,min :10},
    storeId:{type: mongoose.Types.ObjectId ,ref:'store',required:true},
    stock: {type: Number ,required:true,min:1 },
    userLiked: [{type: String}],
    reviews:[{name:{type:String}, avatar:{type:String}, review:{type:String, required: true}, vote: { type: Number, default: 0 }, userId:{type: mongoose.Types.ObjectId, ref: 'user', required:true}, default: 0}],
    usersRatedProduct: [String],   
})

const Product = mongoose.model('product',productSchema);

module.exports = Product;