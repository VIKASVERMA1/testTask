const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db");
const updateToken = sequelize.define("token", {
  update_token: {
    type: DataTypes.STRING,
  },
});


module.exports = updateToken;