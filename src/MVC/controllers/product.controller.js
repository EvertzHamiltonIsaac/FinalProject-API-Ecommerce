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
        const allProduct = await Product.find();
        res.status(302).send(allProduct);
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