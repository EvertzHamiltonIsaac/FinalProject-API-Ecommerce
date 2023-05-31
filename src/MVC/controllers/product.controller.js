const Product = require('../models/product.model');
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');

//!Configurar los codigos HTTP en la pagina completa
const createProduct = asyncHandler(async (req, res) => {
    try {
        if(req.body.title){
            req.body.slug = slugify(req.body.title);
        }

        const newProduct = await Product.create(req.body);
        res.json(newProduct)

    } catch (error) {
        throw new Error(error)
    }
    res.json({message: ''})
});

const getProductById = asyncHandler (async (req, res) => {
    const {id} = req.params
    try {
        const findProduct = await Product.findById(id);
        res.json(findProduct)
    } catch (error) {
        
    }
});

const getAllProducts = asyncHandler (async (req, res) => {
    try {
        const allProduct = await Product.find();
        res.json(allProduct);
    } catch(error) {
        throw new Error(error);
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

        res.json(updatedProduct);
    } catch (error) {
        throw new Error(error)
    }
});

const deleteProduct = asyncHandler (async (req, res) => {
    const {id} = req.params;
    try {
        const deletedProduct = await Product.findOneAndDelete(id);
        res.json(deletedProduct);
    } catch (error) {
        throw new Error(error)
    }
});


module.exports = {createProduct, getProductById, getAllProducts, updateProduct, deleteProduct }