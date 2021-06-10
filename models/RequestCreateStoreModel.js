const mongoose = require('mongoose');

const requestStoreSchema = new mongoose.Schema({
    nameStore: { type: String, required: true },
    description: { type: String, required:true },
    category: { type: mongoose.Types.ObjectId, ref: 'category',required:true },
    logoStore:{url:{type: String},publicId:{type: String}},
    userOfRequest : {type: mongoose.Types.ObjectId, ref: 'user'} ,
    //status : {type:String,default:"pending",enum: ['pending', 'approved','rejected']}, 
    //answeredByUser:  {type: mongoose.Types.ObjectId, ref: 'user'} ,
})

const RequestCreateStore = mongoose.model('requestCreateStore', requestStoreSchema);

module.exports = RequestCreateStore;
