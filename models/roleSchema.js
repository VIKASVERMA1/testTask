const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../dbConnection");
const userData=require("../models/userSchema")
const roleData = sequelize.define("role", {
    role_Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
  role_Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

roleData.beforeSync(()=>console.log('before creating the Role table'));
roleData.afterSync(()=>console.log('before creating the Role table'));

roleData.hasMany(userData, { foreignKey: "role_Id", as: "registration" });
userData.belongsTo(roleData, {
  foreignKey: "role_Id",
  as: "role",
});

module.exports = roleData;