const express = require('express');
const { authMiddleware, isAdmin } = require('../../middlewares/authMiddleware');
const { uploadPhoto, blogImgResize } = require("../../middlewares/uploadImages");
const {likeBlog, createBlog, deleteBlog, updateBlog, getBlogById, getAllBlogs, disLikeBlog, uploadImages } = require('../controllers/blog.controller');
 
const router = express.Router();

router.put('/blog/likes', authMiddleware, likeBlog);
router.put('/blog/dislikes', authMiddleware, disLikeBlog);
router.get('/blog/', getAllBlogs);
router.delete('/blog/delete/:id', authMiddleware, isAdmin, deleteBlog);
router.post('/blog/create', authMiddleware, isAdmin, createBlog);
router.get('/blog/:id', getBlogById);
router.put('/blog/update/:id', authMiddleware, isAdmin, updateBlog);

router.put("/blog/uploadImg/:id", 
authMiddleware, isAdmin, 
uploadPhoto.any("images", 2), 
blogImgResize, 
uploadImages
);
module.exports = router