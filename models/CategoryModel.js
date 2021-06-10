const mongoose = require ('mongoose');

const categorySchema = new mongoose.Schema({
    nameCategory:{type: String, required: true},
    imageCategory: {type: String},
    bannerCategory: {type: String, required: true}
})

const Category = mongoose.model('category',categorySchema);

module.exports = Category;