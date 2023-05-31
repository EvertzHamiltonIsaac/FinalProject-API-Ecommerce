const Product = require('../models/product.model');
const asyncHandler = require('express-async-handler');

//!Configurar los codigos HTTP
const createProduct = asyncHandler(async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);
        res.json(newProduct)
    } catch (error) {
        throw new Error(error)
    }
    res.json({message: ''})
})

const getProduct = asyncHandler (async (req, res) => {
    const {id} = req.params
    try {
        const findProduct = await Product.findById(id);
        res.json(findProduct)
    } catch (error) {
        
    }
})




module.exports = {createProduct, getProduct}