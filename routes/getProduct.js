const express = require('express');
const Product = require('../models/products');
const router = express.Router();

router.get('/allProducts',(req,res,next)=>{
    Product.find({},(err,product)=>
    {
        if(err){
            res.json(next)
        }
        res.json(product)
    });
})
module.exports = router;