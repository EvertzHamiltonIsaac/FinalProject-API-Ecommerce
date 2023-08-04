const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: "dhljwsqha",
  api_key: "335127533416447",
  api_secret: "DYaT7mLT3h3b6poj2DwF0_Pyu9s",
});

const cloudinaryUploadImg = async (fileToUploads) => {
  // console.log(fileToUploads);
  return new Promise((resolve) => {
    cloudinary.uploader.upload(fileToUploads, (result) => {
      resolve(
        {
          url: result.secure_url,
          asset_id: result.asset_id,
          public_id: result.public_id,
        },
        {
          resource_type: "auto",
        }
      );
    });
  });
};
const cloudinaryDeleteImg = async (fileToDelete) => {
  return new Promise((resolve) => {
    cloudinary.uploader.destroy(fileToDelete, (result) => {
      resolve(
        {
          url: result.secure_url,
          asset_id: result.asset_id,
          public_id: result.public_id,
        },
        {
          resource_type: "auto",
        }
      );
    });
  });
};

module.exports = { cloudinaryUploadImg, cloudinaryDeleteImg };
