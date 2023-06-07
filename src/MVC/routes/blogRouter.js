const express = require('express');
const { authMiddleware, isAdmin } = require('../../middlewares/authMiddleware');

const {likeBlog, createBlog, deleteBlog, updateBlog, getBlogById, getAllBlogs, disLikeBlog } = require('../controllers/blog.controller');
 
const router = express.Router();

router.put('/blog/likes', authMiddleware, likeBlog);
router.put('/blog/dislikes', authMiddleware, disLikeBlog);
router.get('/blog/', getAllBlogs);
router.delete('/blog/:id', authMiddleware, isAdmin, deleteBlog);
router.post('/blog/', authMiddleware, isAdmin, createBlog);
router.get('/blog/:id', getBlogById);
router.put('/blog/:id', authMiddleware, isAdmin, updateBlog);

module.exports = router