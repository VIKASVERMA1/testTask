// const dbConfig=require('./config/dbConfig');
require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(
  DB=process.env.DB,
  USER=process.env.DB_USER,
  PASSWORD=process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: "mysql",
    operatorsAliases: false,

    pool: {
      max: 5,
      min: 0,
    },
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Database Connected..");
  })
  .catch((err) => {
    console.log("Error" + err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

sequelize.sync({ force: false }).then(() => {
  console.log("Yes re-sync done");
});

module.exports = sequelize;
