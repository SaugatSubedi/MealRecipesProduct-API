const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    image:{
        type: String
    },
    productName:{
        type: String,
        required: true,
        trim: true
    },
    description:{
        type: String,
        required: true,
        trim: true
    },
    originalPrice:{
        type: Number,
        required: true,
        trim: true
    },
    discountedPrice:{
        type: Number,
        required: true,
        trim: true
    }
}, {timestamps: true});

const product = mongoose.model('products', productSchema);
module.exports = product;