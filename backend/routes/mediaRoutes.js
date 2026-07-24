const express = require("express");
const router = express.Router();

const {
  getImages,
  deleteImage,
} = require("../controllers/mediaController");

router.get("/", getImages);
router.delete("/:name", deleteImage);

module.exports = router;