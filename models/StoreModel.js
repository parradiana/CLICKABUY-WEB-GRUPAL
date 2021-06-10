const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
    nameStore: { type: String, required: true },
    storeHero: { url: { type: String }, publicId: { type: String } },
    description: { type: String },
    category: { type: mongoose.Types.ObjectId, ref: 'category' },
    rate: [{ vote: { type: Number, default: 0 }, userId: { type: mongoose.Types.ObjectId, ref: 'user', required: true } }],
    usersRated: [String],
    owners: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
    logoStore: { url: { type: String }, publicId: { type: String } },
})

const Store = mongoose.model('store', storeSchema);

module.exports = Store;
