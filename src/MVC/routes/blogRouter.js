const express = require('express');
const { authMiddleware, isAdmin } = require('../../middlewares/authMiddleware');

const {likeBlog, createBlog, deleteBlog, updateBlog, getBlogById, getAllBlogs } = require('../controllers/blog.controller');
 
const router = express.Router();


router.post('/blog/', authMiddleware, isAdmin, createBlog);
router.put('/blog/likes', authMiddleware, likeBlog);
router.get('/blog/', getAllBlogs);

router.delete('/blog/:id', authMiddleware, isAdmin, deleteBlog);
router.put('/blog/:id', authMiddleware, isAdmin, updateBlog);
router.get('/blog/:id', getBlogById);

module.exports = router