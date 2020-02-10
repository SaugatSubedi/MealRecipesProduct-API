const express = require('express');
const Product = require('../models/products');
// const auth = require('../auth');

const router = express.Router();

router.route('/')
    .post((req,res,next) => {
        let products = new Product(req.body);
        products.save()
            .then((products) => {
                res.statusCode = 201;
                res.json(products);
            }).catch(next);
    })

    .delete((req,res,next) => {
        Product.deleteMany({ adminId: req.user._id})
            .then((reply) => {
                res.json(reply);
            })
            .catch(next);
    })


router.route('/:id')
    .get((req,res,next) => {
        Product.findOne({adminId: req.user._id, _id: req.params.id})
            .then((products) => {
                if(products == null)
                    throw new Error("No product found!")
                    res.json(products);
            }).catch(next);
    })

    .post((req,res) => {
        res.statusCode = 405;
        res.json({message: "Invalid method for inserting data."})
    })

    .put((req,res,next) => {
        Product.findOneAndUpdate({
            adminId: req.user._id,
            _id: req.params.id
        },
        {
            $set: req.body
        },
        {
            new: true
        })
        .then((reply) => {
            if(reply == null)
                throw new Error ("Product not found!");
                res.json(reply);  
        }).catch(next);
    })

module.exports = router;

// const express = require('express');
// const router = express.Router();
// const productModel = require('../models/products');

// router.route('/')
//     .get(async (req, res)=>{
//         try{
//             const data = await productModel.find({})
//             res.json({
//                 status: 200,
//                 isSuccess: true,
//                 data: data
//             })
//         }
//         catch(err){
//             res.json({
//                 isSuccess: false,
//                 error: err
//             })
//         }
//     })
//     .post(async (req, res)=>{
//         const data = new productModel({
//             image: req.body.image,
//             productName: req.body.productName,
//             description: req.body.description,
//             originalPrice: req.body.originalPrice,
//             discountedPrice: req.body.discountedPrice
//         })
//         try{
//             const postData = await data.save();
//             res.json({
//                 status: 200,
//                 data: postData,
//                 isSuccess: true,
//                 message: 'Successfully inserted'
//             })
//             // console.log('Product Inserted');
//         }
//         catch(err){
//             res.json({
//                 isSuccess:false,
//                 error: err,
//                 message: 'Something went wrong, product not inserted'
//             })
//             console.log('Product add failed.');
//         }
//     })
// router.route('/:id')
//     .get(async (req, res)=>{
//         try{
//             const data = await productModel.findById({_id:req.params.id})
//             res.json({
//                 status: 200,
//                 isSuccess: true,
//                 data: data,
//                 message: 'Fetched successfully'
//             })
//         }
//         catch(err){
//             res.json({
//                 isSuccess: false,
//                 error: err
//             })
//         }
//     })
//     // .put(jwtCheck, async (req, res)=>{
//     .put(async (req, res)=>{
//         const putData = productModel({
//             image: req.body.image,
//             productName: req.body.productName,
//             description: req.body.description,
//             originalPrice: req.body.originalPrice,
//             discountedPrice: req.body.discountedPrice
//         })
//         try{
//             const data = await productModel.updateOne({_id: req.params.id},
//             {
//                 $set:{
//                     image: req.body.image,
//                     productName: req.body.productName,
//                     description: req.body.description,
//                     originalPrice: req.body.originalPrice,
//                     discountedPrice: req.body.discountedPrice
//                 }
//             })
//             res.json({
//                 status: 200,
//                 isSuccess: true,
//                 formData: putData,
//                 data: data,
//                 message: 'Product Successfully Updated.'
//             })
//             console.log("Product Successfully Updated.");
//         }
//         catch(err){
//             res.json({
//                 isSuccess: false,
//                 error: err,
//                 message: 'Product Update failed.'
//             })
//             console.log("Product update failed.");
//         }
//     })
//     .delete(async (req, res)=>{
//         const data = await productModel.findOne({_id: req.params.id});
//         try{
//             if(data!=null){
//                 const dataDelete = await productModel.deleteOne({_id: req.params.id})
//                 res.json({
//                     status: 200,
//                     isSuccess: true,
//                     data: data,
//                     message: 'Successfully deleted'
//                 })
//                 console.log("Successfully Deleted.");
//             }
//             else{
//                 res.json({
//                     status: 410,
//                     isSuccess: false,
//                     data: data,
//                     message: 'No data found'
//                 })
//                 console.log("No any data found");
//             }
//         }
//         catch(err){
//             res.json({
//                 status: 500,
//                 isSuccess: false,
//                 error: err,
//                 message: 'Internal Server Error'
//             })
//         }
//     })
// module.exports = router;