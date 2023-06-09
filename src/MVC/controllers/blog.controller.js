const Blog = require("../models/blog.model");
const asyncHandler = require("express-async-handler");
const validateMongoId = require("../../utils/validateMongoId");
const {cloudinaryUploadImg} = require("../../utils/cloudinary");
const fs = require("fs");

//* Create Blog ✅
const createBlog = asyncHandler(async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body);

    res.status(201).send({
      message: "New Blog Created Successfully",
      data: newBlog?._doc,
    });
  } catch (error) {
    res.status(400).send({ status: 404, message: error.message });
  }
});

//* Update Blog ✅
const updateBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoId(id);
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).send({
      message: "Blog Update Successfully",
      data: updatedBlog?._doc,
    });
  } catch (error) {
    res.status(400).send({ status: 404, message: error.message });
  }
});

//* Get Blog By Id ✅
const getBlogById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoId(id);
  try {
    const blog = await Blog.findById(id).populate("likes").populate("dislikes");
    const updateViews = await Blog.findByIdAndUpdate(
      id,
      {
        $inc: { numViews: 1 },
      },
      { new: true }
    );

    res.status(200).send({
      message: "Blog Found",
      data: blog?._doc,
    });
  } catch (error) {
    res.status(404).send({ status: 404, message: error.message });
  }
});

//* Get All Blogs ✅ 
const getAllBlogs = asyncHandler(async (req, res) => {
  try {
    const allBlogs = await Blog.find();

    res.status(200).send({
      message: "Blogs Found",
      data: allBlogs,
    });
  } catch (error) {
    res.status(404).send({ status: 404, message: error.message });
  }
});

//* Delete Blog ✅
const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoId(id);
  try {
    const deletedBlog = await Blog.findByIdAndDelete(id, req.body, {
      new: true,
    });

    res.status(200).send({
      message: "Blog Deleted Successfully",
      data: deletedBlog?._doc,
    });
  } catch (error) {
    res.status(400).send({ status: 404, message: error.message });
  }
});

//* Like Blog ✅
//? Limpiar Codigo
const likeBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.body;
  validateMongoId(blogId);

  //! find the blog
  const blog = await Blog.findById(blogId);

  //! find the user logged
  const loginUserId = req?.user?._id;

  //! check if the user has liked the post
  const isLiked = blog?.isLiked;

  const alreadyDisliked = Blog?.dislikes?.(
    (userId) => userId?.toString() === loginUserId?.toString()
  );

  if (alreadyDisliked) {
    const blogLiked = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { dislikes: loginUserId },
        isDisliked: false,
      },
      { new: true }
    );

    res
      .status(200)
      .send({ message: "Blog Liked Successfully", data: blogLiked });
  }

  if (isLiked) {
    const blogLiked = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      { new: true }
    );

    res
      .status(200)
      .send({ message: "Blog Liked Successfully", data: blogLiked });
  } else {
    const blogLiked = await Blog.findByIdAndUpdate(
      blogId,
      {
        $push: { likes: loginUserId },
        isLiked: true,
      },
      { new: true }
    );
    res.status(200).send({ message: "Blog Disliked Successfully", data: blogLiked });
  }
});

//* Dislike Blog ✅
//? Limpiar Codigo
const disLikeBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.body;
  validateMongoId(blogId);

  //! find the blog
  const blog = await Blog.findById(blogId);

  //! find the user logged
  const loginUserId = req?.user?._id;

  //! check if the user has liked the post
  const isDisLiked = blog?.isDisliked;

  const alreadyLiked = Blog?.likes?.(
    (userId) => userId?.toString() === loginUserId?.toString()
  );

  if (alreadyLiked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      { new: true }
    );

    res.status(200).send({ message: "Blog Disliked Successfully", data: blog });
  }

  if (isDisLiked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { dislikes: loginUserId },
        isDisliked: false,
      },
      { new: true }
    );

    res.status(200).send({ message: "Blog Disliked Successfully", data: blog });
  } else {
    const blogLiked = await Blog.findByIdAndUpdate(
      blogId,
      {
        $push: { dislikes: loginUserId },
        isDisliked: true,
      },
      { new: true }
    );
    res
      .status(200)
      .send({ message: "Blog Disliked Successfully", data: blogLiked });
  }
});

//* Upload blog Images ✅
const uploadImages = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoId(id);
  
  try {
    const uploader = (path) => cloudinaryUploadImg(path, "images");
    const files = req.files;
    const urls = [];
    console.log(files);
    for (const file of files) {
      const { path } = file;
      const newPath = await uploader(path);
      urls.push(newPath);
      fs.unlinkSync(path);
    }

    const findBlog = await Blog.findByIdAndUpdate(
      id,
      {
        images: urls.map((file) => {
          return file;
        }),
      },
      { new: true }
    );

    res
      .status(200)
      .send({ message: "Blog Images Updated Successfully", data: findBlog });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createBlog,
  getAllBlogs,
  updateBlog,
  getBlogById,
  deleteBlog,
  likeBlog,
  disLikeBlog,
  uploadImages,
};
