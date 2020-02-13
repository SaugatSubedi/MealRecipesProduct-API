const mongoose = require('mongoose');

const buySchema = new mongoose.Schema({
    boughtProductImg:{
        type: String,
        required: true
    },
    boughtProductName:{
        type: String,
        required: true
    },
    boughtProductPrice:{
        type: String,
        required: true
    },
    boughtProductQuantity:{
        type: Number,
        required: true,
        default: 1
    },
    boughtProductTotalPrice:{
        type: String,
        required: true
    },
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products'
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
}, {timestamps: true});

module.exports = mongoose.model('Buy', buySchema);