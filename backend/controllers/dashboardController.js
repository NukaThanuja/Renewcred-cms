const { getDB } = require("../config/database");

const getDashboardStats = async (req, res) => {
  try {
    const db = getDB();

    const pages = await db.get(
      "SELECT COUNT(DISTINCT page) AS totalPages FROM content"
    );

    const sections = await db.get(
      "SELECT COUNT(*) AS totalSections FROM content"
    );

    const images = await db.get(
      "SELECT COUNT(image) AS totalImages FROM content WHERE image IS NOT NULL"
    );

    const users = await db.get(
      "SELECT COUNT(*) AS totalUsers FROM users"
    );

    const published = await db.get(
      "SELECT COUNT(*) AS count FROM content WHERE status='Published'"
    );

    const draft = await db.get(
      "SELECT COUNT(*) AS count FROM content WHERE status='Draft'"
    );

    res.json({
      totalPages: pages.totalPages,
      totalSections: sections.totalSections,
      totalImages: images.totalImages,
      totalUsers: users.totalUsers,
      published: published.count,
      draft: draft.count,
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};