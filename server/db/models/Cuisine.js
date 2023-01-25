const Sequelize = require("sequelize");
const db = require("../db");

const Cuisine = db.define("cuisine", {
  category: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});

module.exports = Cuisine
