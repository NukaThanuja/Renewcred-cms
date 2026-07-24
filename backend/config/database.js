let db = null;

const setDB = (database) => {
  db = database;
};

const getDB = () => {
  return db;
};

module.exports = {
  setDB,
  getDB,
};