const { getDB } = require("../config/database");

const getAllContent = async (req, res) => {
  try {
    const db = getDB();

    const rows = await db.all("SELECT * FROM content");

    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getContentById = async (req, res) => {
  try {
    const db = getDB();

    const row = await db.get(
      "SELECT * FROM content WHERE id=?",
      [req.params.id]
    );

    res.json(row);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createContent = async (req, res) => {
  try {
    const db = getDB();

    const { page, section, content, image } = req.body;

    await db.run(
  "INSERT INTO content(page, section, content, image) VALUES(?,?,?,?)",
  [page, section, content, image]
);

    res.json({
      message: "Content Added Successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateContent = async (req, res) => {
  try {
    const db = getDB();

    const { page, section, content, image } = req.body;

    await db.run(
  "UPDATE content SET page=?, section=?, content=?, image=? WHERE id=?",
  [page, section, content, image, req.params.id]
);

    res.json({
      message: "Content Updated Successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteContent = async (req, res) => {
  try {
    const db = getDB();

    await db.run(
      "DELETE FROM content WHERE id=?",
      [req.params.id]
    );

    res.json({
      message: "Content Deleted Successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




const getContentByPage = async (req, res) => {
  try {
    const db = getDB();

    const data = await db.all(
      `SELECT *
       FROM content
       WHERE LOWER(page) = LOWER(?)
       AND status = 'Published'`,
      [req.params.page]
    );

    res.json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  createContent,
   getContentById,
  getAllContent,
  updateContent,
  deleteContent,
  getContentByPage,
};