const Product = require("../models/product.model");
const User = require("../models/user.model");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

const createProduct = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const newProduct = await Product.create(req.body);
    res.status(201).send(newProduct);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});
const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const findProduct = await Product.findById(id);
    res.status(302).send(findProduct);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});
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
    res.status(302).send(product);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});
const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updatedProduct = await Product.findOneAndUpdate({ _id: id }, req.body, { new: true });
    res.status(200).send(updatedProduct);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});
const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await Product.findOneAndDelete(id);
    res.status(200).send(deletedProduct);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

//TODO: Wish List
const addToWishList = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { productId } = req.body;

  try {
    const user = await User.findById(_id);
    const alreadyAdded = user.wishlist.find((id) => id.toString() === productId);

    if (alreadyAdded) {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $pull: { wishlist: productId },
        },
        {
          new: true,
        }
      );

      res.status(200).send(user);
    } else {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $push: { wishlist: productId },
        },
        {
          new: true,
        }
      );

      res.status(200).send(user);
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

const ratingProduct = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { stars, productId, comment} = req.body;

  const product = await Product.findById(productId);
  let alreadyRated = product.ratings.find((id) => id.postedby.toString() === _id.toString());

  try {
    if (alreadyRated) {
      const updateRating = await Product.updateOne(
        {
          ratings: { $elemMatch: alreadyRated },
        },
        {
          $set: { "ratings.$.stars": stars, "ratings.$.comment": comment },
        }, {new : true}
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
        {new: true}
    );

    res.status(200).send(productWithRatings);

  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

const uploadImages = asyncHandler(async (req, res) => {
  console.log(req.files);
})

module.exports = {
  createProduct,
  getProductById,
  getAllProducts,
  updateProduct,
  deleteProduct,
  addToWishList,
  ratingProduct,
  uploadImages
};
