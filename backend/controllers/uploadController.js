const uploadImage = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    return res.status(200).json({
      message: "Image uploaded successfully",
      imageUrl: `http://localhost:5000/uploads/${req.file.filename}`,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  uploadImage,
};