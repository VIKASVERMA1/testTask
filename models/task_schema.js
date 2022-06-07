const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db");
const userData=require("./user_schema")
const userTask = sequelize.define("addTask", {
  task_Id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  task_Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

userTask.beforeSync(() => console.log("before creating the userTask table"));
userTask.afterSync(() => console.log("before creating the userTask table"));

userTask.hasMany(userData, { foreignKey: "task_Id", as: "registration" });
userData.belongsTo(userTask, {foreignKey: "task_Id",as: "addTask"});

module.exports = userTask;
