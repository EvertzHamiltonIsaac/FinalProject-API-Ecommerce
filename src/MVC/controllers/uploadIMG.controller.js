const fs = require("fs");
const asyncHandler = require("express-async-handler");
const {
  cloudinaryUploadImg,
  cloudinaryDeleteImg,
} = require("../../utils/cloudinary");

//* Upload Product Images ✅
const uploadImages = asyncHandler(async (req, res) => {
  try {
    const uploader = (path) => cloudinaryUploadImg(path, "images");
    const files = req.files;
    if (!files) throw new Error(error.message);
    const urls = [];
    for (const file of files) {
      const { path } = file;
      const newPath = await uploader(path);
      urls.push(newPath);
      fs.unlinkSync(path);
    }
    const images = urls.map((file) => {
      return file;
    });

    res.status(200).send({ message: "Uploaded Images", data: images });
  } catch (error) {
    // res.status(400).send({ message: error.message });
    throw new Error(error);
  }
});

//* Delete Images Product ✅
const deleteImages = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = cloudinaryDeleteImg(id, "images");
    res.status(200).send({ message: "Deleted Images", data: deleted });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  uploadImages,
  deleteImages,
};
