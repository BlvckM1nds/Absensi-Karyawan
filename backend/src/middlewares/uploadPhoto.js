const cloudinary = require("../config/cloudinary");

async function uploadPhoto(req, res) {
  try {
    const { image_url } = req.body;

    const cloudinary_res = await cloudinary.uploader.upload(image_url, {
      folder: "/evidences-demo"
    });

    res.status(201).json({
      success: true,
      message: "Evidence uploaded",
      data: cloudinary_res.secure_url
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  };
};

module.exports = uploadPhoto;