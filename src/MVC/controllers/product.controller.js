const Product = require("../models/product.model");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const validateMongoDbId = require("../../utils/validateMongoId");
const {
  cloudinaryUploadImg,
  cloudinaryDeleteImg,
} = require("../../utils/cloudinary");
const fs = require("fs");

//* Create Product ✅
const createProduct = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const newProduct = await Product.create(req.body);
    res.status(201).send({ message: "Created New Product", data: newProduct });
  } catch (error) {
    res.status(400).send({ status: 400, message: error.message });
  }
});

//* Get Product ✅
const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id)
  try {
    const findProduct = await Product.findById(id);
    res.status(200).send({ message: "Product Founded", data: findProduct });
  } catch (error) {
    res.status(404).send({ status: 404, message: error.message });
  }
});

//* Get All Products ✅
const getAllProducts = asyncHandler(async (req, res) => {
  try {
    const queryOj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((excluded) => delete queryOj[excluded]);

    let queryStr = JSON.stringify(queryOj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    let query = Product.find(JSON.parse(queryStr));

    //? Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    //? Limiting the Fields
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    //? pagination
    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const productCount = await Product.countDocuments();
      if (skip >= productCount) throw new Error("This Page Does not Exists.");
    }
    console.log(page, limit, skip);

    const product = await query;
    res.status(200).send({ message: "All Product Founded", data: product });
  } catch (error) {
    res.status(404).send({ status: 404, message: error.message });
  }
});

//* Update Product ✅
const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id)
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id },
      req.body,
      { new: true }
    );
    res
      .status(200)
      .send({ message: "Updated Product Successfully", data: updatedProduct });
  } catch (error) {
    res.status(400).send({ status: 400, message: error.message });
  }
});

//* Delete Product ✅
const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id)
  try {
    const deletedProduct = await Product.findOneAndDelete(id);
    res
      .status(200)
      .send({ message: "Deleted Product Successfully", data: deletedProduct });
  } catch (error) {
    res.status(400).send({ status: 400, message: error.message });
  }
});

//* Rating Product ✅
const ratingProduct = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  const { stars, productId, comment } = req.body;

  const product = await Product.findById(productId);
  let alreadyRated = product.ratings.find(
    (id) => id.postedby.toString() === _id.toString()
  );

  try {
    if (alreadyRated) {
      const updateRating = await Product.updateOne(
        {
          ratings: { $elemMatch: alreadyRated },
        },
        {
          $set: { "ratings.$.stars": stars, "ratings.$.comment": comment },
        },
        { new: true }
      );
      // res.status(200).send(updateRating);
    } else {
      const ratedProduct = await Product.findByIdAndUpdate(
        productId,
        {
          $push: {
            ratings: {
              stars: stars,
              comment: comment,
              postedby: _id,
            },
          },
        },
        { new: true }
      );
      //   res.status(200).send({ ratedProduct });
    }

    const getAllRatings = await Product.findById(productId);
    let totalRating = getAllRatings.ratings.length;
    let ratingSum = getAllRatings.ratings
      .map((item) => item.stars)
      .reduce((prev, curr) => prev + curr, 0);
    let actualRating = Math.round(ratingSum / totalRating);

    let productWithRatings = await Product.findByIdAndUpdate(
      productId,
      {
        totalrating: actualRating,
      },
      { new: true }
    );

    res
      .status(200)
      .send({ message: "Product Ratings", data: productWithRatings });
  } catch (error) {
    res.status(400).send({ status: 400, message: error.message });
  }
});

//* Upload Product Images ✅
const uploadProductImages = asyncHandler(async (req, res) => {
  try {
    const uploader = (path) => cloudinaryUploadImg(path, "images");
    const files = req.files;
    const urls = [];
    for (const file of files) {
      const { path } = file;
      const newPath = await uploader(path);
      // console.log(newPath);
      urls.push(newPath);
      fs.unlinkSync(path);
    }
    const images = urls.map((file) => {
      return file;
    });
    res.status(200).send({ message: "Uploaded Images", data: images });
  } catch (error) {
    throw new Error(error);
  }
});

//* Delete Images Product ✅
const deleteImages = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deletedImage = cloudinaryDeleteImg(id, "images");
    res.status(200).send({ message: "Deleted Images", data: deletedImage });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createProduct,
  getProductById,
  getAllProducts,
  updateProduct,
  deleteProduct,
  ratingProduct,
  uploadProductImages,
  deleteImages,
};
