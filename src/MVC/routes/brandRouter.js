const express = require('express');
const router = express.Router();
const {createBrand, updateBrand, deleteBrand, getBrandById, getAllBrand} = require('../controllers/brand.controller');
const { authMiddleware, isAdmin } = require('../../middlewares/authMiddleware');

router.get('/brand/', getAllBrand);
router.get('/brand/:id', getBrandById);
router.post('/brand/create', authMiddleware, isAdmin, createBrand);
router.put('/brand/update/:id', authMiddleware, isAdmin, updateBrand);
router.delete('/brand/delete/:id', authMiddleware, isAdmin, deleteBrand);

module.exports = router;