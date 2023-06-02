const Product = require('../models/product.model');
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');

const createProduct = asyncHandler(async (req, res) => {
    try {
        if(req.body.title){
            req.body.slug = slugify(req.body.title);
        }
        const newProduct = await Product.create(req.body);
        res.status(201).send(newProduct)
    } catch (error) {
        res.status(400).send({
            message: error.message
        })
    }
});
const getProductById = asyncHandler (async (req, res) => {
    const {id} = req.params
    try {
        const findProduct = await Product.findById(id);
        res.status(302).send(findProduct);
    } catch (error) {
        res.status(404).send({message: error.message});
    }
});
const getAllProducts = asyncHandler (async (req, res) => {
    try {
        const queryOj = {...req.query};
        const excludeFields = ['page','sort','limit','fields'];
        excludeFields.forEach(excluded => delete queryOj[excluded])
        
        let queryStr = JSON.stringify(queryOj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
        let query = Product.find(JSON.parse(queryStr));

        //? Sorting
        if(req.query.sort){
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        }else {
            query = query.sort('-createdAt');
        }

        //? Limiting the Fields
        if(req.query.fields){
            const fields = req.query.fields.split(',').join(' ');
            query = query.select(fields);
        } else {
            query = query.select('-__v');
        }

        //? pagination 
        const page = req.query.page;
        const limit = req.query.limit;
        const skip = (page - 1) * limit;
        query = query.skip(skip).limit(limit);

        if(req.query.page){
            const productCount = await Product.countDocuments();
            if(skip >= productCount)throw new Error ('This Page Does not Exists.')
        }
        console.log(page, limit, skip);

        const product = await query;
        res.status(302).send(product);
    } catch(error) {
        res.status(404).send({message: error.message});
    }
});
const updateProduct = asyncHandler (async (req, res) => {
    const {id} = req.params;
    try {
        if(req.body.title){
            req.body.slug = slugify(req.body.title);
        }
        const updatedProduct = await Product.findOneAndUpdate(
            {_id: id},
            req.body,
            {new: true}
        );
        res.status(200).send(updatedProduct);
    } catch (error) {
        res.status(400).send({message: error.message});
    }
});
const deleteProduct = asyncHandler (async (req, res) => {
    const {id} = req.params;
    try {
        const deletedProduct = await Product.findOneAndDelete(id);
        res.status(200).send(deletedProduct);
    } catch (error) {
        res.status(400).send({message: error.message});
    }
});

module.exports = {createProduct, getProductById, getAllProducts, updateProduct, deleteProduct }