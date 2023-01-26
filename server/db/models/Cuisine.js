const Sequelize = require("sequelize");
const db = require("../db");

const Cuisine = db.define("cuisine", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false,
  }
}, { timestamps: false });

module.exports = Cuisine
