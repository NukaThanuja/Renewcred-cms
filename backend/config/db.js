const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const path = require("path");
const fs = require("fs");
const { setDB } = require("./database");

const databaseDir = path.join(__dirname, "../database");

if (!fs.existsSync(databaseDir)) {
  fs.mkdirSync(databaseDir, { recursive: true });
}

const dbPath = path.join(databaseDir, "cms.db");


let db;

const connectDB = async () => {
  db = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  });

  console.log("SQLite Connected");

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL
    );
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS content (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      page TEXT NOT NULL,
      section TEXT NOT NULL,
      content TEXT
    );
  `);
  try {
  await db.exec(`
    ALTER TABLE content
    ADD COLUMN status TEXT DEFAULT 'Published';
  `);

  console.log("Status column added.");
} catch (err) {
  console.log("Status column already exists.");
}
   try {
  await db.exec(`
    ALTER TABLE content
    ADD COLUMN image TEXT;
  `);

  console.log("Image column added.");
} catch (err) {
  console.log("Image column already exists.");
}
  setDB(db);

  return db;
};

module.exports = { connectDB };