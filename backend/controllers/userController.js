const { getDB } = require("../config/database");

const getProfile = async (req, res) => {
  try {
    const db = getDB();

    const user = await db.get(
      "SELECT id, name, email, role FROM users WHERE id = ?",
      [1]
    );

    res.json(user);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  getProfile,
};