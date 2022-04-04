const { findById } = require('../models/productModel');
const Product = require('../models/productModel');
//initialize error handling middleware 
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeature = require('../utils/ApiFeature');
//creating the product
exports.createProduct = catchAsyncErrors(async(req, res, next) => {
    req.body.user = req.user.id;
    const product = await Product.create(req.body);
    
    res.status(201).json({
        message:"api is working now",
        success:true,
        product
    });
});
//getting all products
// Get All Product
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
    const resultPerPage = 2;
    const productCount = await Product.countDocuments();
    const apiFeature = new ApiFeature(Product.find(), req.query).search().filter().pagination(resultPerPage);
    const products = await apiFeature.query;
    
    // const products = await Product.find();

    res.status(200).json({
        success: true,
        products,
        productCount
    });
});
//updating the product
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    
    if(!product)
    {
        return next(new ErrorHandler("Product not found", 404));
    }
    else{
        
        product = await Product.findByIdAndUpdate(
            req.params.id, 
            {$set:req.body},
            {
                new:true,
                runValidators:true,
                useFindAndModify:false
            }
        );
        res.status(200).json({
            message:"product is udpated",
            product
        });
    }
});

//deleting the product
exports.deleteProduct = catchAsyncErrors(async(req, res, next) => {
    let product = await Product.findById(req.params.id);
    res.status(200).json({
        message:'fgdgdfg',
        product
    });
    if(!product){
        return next(new ErrorHander("Product not found", 404));
    }else{
       await product.remove();
       res.status(200).json({
            success:true,
            product
        });
    }
});

//get product details
exports.getProductDetails = catchAsyncErrors(async(req, res, next) => {
    let product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product not found", 404));
    }
    else{
        res.status(200).json({
            success:true,
            product
        });
    }
});