const express = require("express");


const {
  getAllContent,
  getContentById,
  createContent,
  updateContent,
  deleteContent,
  getContentByPage,
} = require("../controllers/contentController");
const verifyToken = require("../middleware/authMiddleware");
const checkRole = require("../middleware/roleMiddleware");
const router = express.Router();

// Anyone with a valid token can view content
router.get("/", verifyToken, getAllContent);

router.get("/page/:page", getContentByPage);

router.get("/:id", verifyToken, getContentById);

// Admin and Editor can create
router.post(
  "/",
  verifyToken,
  checkRole("admin", "editor"),
  createContent
);

// Admin and Editor can update
router.put(
  "/:id",
  verifyToken,
  checkRole("admin", "editor"),
  updateContent
);

// Only Admin can delete
router.delete(
  "/:id",
  verifyToken,
  checkRole("admin"),
  deleteContent
);
module.exports = router;