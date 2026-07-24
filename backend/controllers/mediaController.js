const { getDB } = require("../config/database");
const fs = require("fs");
const path = require("path");

const getImages = async (req, res) => {
  try {
    const db = getDB();

    const rows = await db.all(
      "SELECT id, page, section, image FROM content WHERE image IS NOT NULL"
    );

    res.json(rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to fetch images",
    });
  }
};

const deleteImage = async (req, res) => {
  try {
    const db = getDB();

    const imageName = req.params.name;

    const imagePath = path.join(__dirname, "../uploads", imageName);

    // Delete file only if it exists
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
      console.log("Image file deleted.");
    } else {
      console.log("Image file not found. Removing DB reference only.");
    }

    // Remove image reference from database
    await db.run(
      "UPDATE content SET image = NULL WHERE image LIKE ?",
      [`%${imageName}`]
    );

    res.json({
      message: "Image deleted successfully",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Delete failed",
    });
  }
};
module.exports = {
  getImages,
  deleteImage,
};