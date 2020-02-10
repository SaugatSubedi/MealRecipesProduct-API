const express = require("express");
const mongoose = require("mongoose");
const morgan = require('morgan');
const userRouter = require('./routes/users');
const productRouter = require('./routes/product');
const getProductRouter = require('./routes/getProduct');
// const contactRouter = require('./routes/contacts');
const dotenv = require('dotenv').config();
const uploadRouter = require('./routes/upload');
const auth = require('./auth');
const cors = require('cors');


const app = express();
app.use(morgan('tiny'));
app.use(express.json());
app.options('*', cors());
// let allowCrossDomain = function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', "*");
//     res.header('Access-Control-Allow-Headers', "*");
//     next();
//   }
//   app.use(allowCrossDomain);
app.use(express.urlencoded({extended: true }));

app.use(express.static(__dirname + "/public"));

mongoose.connect(process.env.URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then((db) => {
        console.log("Successfully connected to MongodB server");
    }, (err) => console.log(err));

app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('/upload', uploadRouter);
app.use('/getAllProduct', getProductRouter);
// app.use('/contact', contactRouter);
app.use(auth.verifyUser);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.statusCode = 500;
    res.json({ status: err.message });
});

app.listen(process.env.PORT, () => {
    console.log(`App is running at localhost:${process.env.PORT}`);
});




// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const morgan = require('morgan');

// // Include Routes start //
// const userRoute = require('./routes/users');
// const userImgUpload = require('./user_img_upload');
// // Includes Routes end //

// // Databases connection start //
// const url = 'mongodb://localhost:27017/sampleAPI';
// const connect = mongoose.connect(url,{
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true
// });

// connect.then((db)=>{
//     console.log("Successfully connected to mongodb server...");
// }, (err) =>{
//     console.log(err);
// });
// // Databases connection end //

// const app = express();
// app.use(morgan('tiny'));
// app.use(bodyParser.json());
// app.use(cors());
// app.use(express.urlencoded({extended: true }));
// app.use(express.static(__dirname + "/public"));

// // Routes start //
// app.use('/user', userRoute);
// app.use('/userImage', userImgUpload);
// // Routes end //

// // Server port start //
// const port = process.env.PORT || 3000;
// app.listen(port, 'localhost', () =>{
//     console.log(`Server started at port ${port}...`);
// });
// // Server port end //