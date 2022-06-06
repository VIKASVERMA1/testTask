const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../dbConnection");
// const userTask=require("../models/task")
const userData = sequelize.define("AdminData", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role_Id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  email_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
  },
  confirmPassword: {
    type: DataTypes.STRING,
  },
  task_Id: {
    type: DataTypes.STRING,
  },
  rating: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.STRING,
  },
  managerId:{
      type:DataTypes.STRING
  }
});

userData.beforeSync(() => console.log("before creating the userData table"));
userData.afterSync(() => console.log("before creating the userData table"));




module.exports = userData;
