
const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    rating: { type: Number, required: true },
    desc: { type: String, required: true },
    bid: { type: String, required: true },
    user: { type: String, required: true },
    date: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Brewery', ReviewSchema);
