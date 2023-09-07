const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite", // Используемая БД
  storage: "database.sqlite", // Путь к файлу базы данных SQLite
});

const User = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

async function initializeDatabase() {
  try {
    // Синхронизация схемы базы данных
    await sequelize.sync();
    console.log("Database synchronized");
  } catch (error) {
    console.error("Error initializing database:", error);
  }
}

async function createUser(username, password) {
  try {
    const user = await User.create({ username, password });
    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

async function findUserByUsername(username) {
  try {
    const user = await User.findOne({ where: { username } });
    return user;
  } catch (error) {
    console.error("Error finding user by username:", error);
    throw error;
  }
}

module.exports = {
  initializeDatabase,
  createUser,
  findUserByUsername,
};