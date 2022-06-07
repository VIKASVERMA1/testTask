const userDataDb = require("../models/user_schema");
const roleDb = require("../models/role_schema");
const tokenDb = require("../models/token_schema");
const taskDb = require("../models/task_schema");
const{validationResult}=require("express-validator")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
//create main model
const userdatas = userDataDb;
const rolesData = roleDb;
const updateToken = tokenDb;
const userTask = taskDb;

//API for creating role of users

const addRole = async (req, res) => {
  try {
    let role = {
      role_Id: req.body.role_Id,
      role_Name: req.body.role_Name,
    };
    const roles = await rolesData.create(role);
    res.status(200).send(roles);
  } catch (error) {
    console.log(error);
  }
};


//API for signup a User----------

const registerUser = async (req, res) => {
  try {
    const error=validationResult(req)
if(!error.isEmpty()){
  return res.status(400).send({error:error.array()})
}
    if (req.body.password == req.body.confirmPassword) {
      let usersEmail = await userdatas.findOne({
        where: { email_id: req.body.email_id },
      });
      console.log(usersEmail);
      if (usersEmail == null) {
        let userNsame = await userdatas.findOne({
          where: { userName: req.body.userName },
        });
        if (userNsame == null) {
          //generate hash password
          const salt = await bcrypt.genSalt(10);
          const passwords = await bcrypt.hash(req.body.password, salt);
          console.log(passwords);
          let users = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            email_id: req.body.email_id,
            role_Id: req.body.role_Id,
            password: passwords,
            rating: "",
            status: "",
            managerId: "",
            confirmPassword: passwords,
          };
          const data = await userdatas.create(users);
          res.status(200).send({
            msg: "user has been registered successfully",
            data: data,
          });
        } else {
          res.send("This user name is already present");
        }
      } else {
        res.send("This email_id already exist");
      }
    } else {
      res.send("password does not match with confirm password");
    }
  } catch (error) {
    console.log(error);
  }
};

//login API for All register user

const userLogin = async (req, res) => {
  const name = req.body.userName;
  const pass = req.body.password;
  try {
    let userdata = await userdatas.findOne({ where: { userName: name } });
    const isMatch = await bcrypt.compare(pass, userdata.password);
    if (isMatch) {
      const data1 = await userdatas.findOne({
        where: { userName: name },
      });
      let date = new Date();
      const token = jwt.sign(
        { user_id: userdatas.id, email_id: userdatas.email_id },
        secret.jwtSecret,
        { expiresIn: "1hr" }
      );
      let access = {
        update_token: token,
      };
      const info = await updateToken.create(access);
      res.status(200).json({
        message: "User found",
        accessInfo: info,
        data: data1,
      });
    } else {
      res.status(500).send("login unsuccessfull");
    }
  } catch (error) {
    console.log(error);
  }
};
// ///get All data of registred person

const getAllData = async (req, res) => {
    let userdata = await userdatas.findAll({
      include: [
        {
          model: rolesData,
          as: "role",
        },
      ],
    });
    res.status(200).send(userdata);
  };


  // //get person Data by userName-----

const getUserData = async (req, res) => {
    let userdata = await userdatas.findAll({
      include: [
        {
          model: rolesData,
          as: "role",
        },
      ],
      where: { userName: req.body.userName },
    });
    res.status(200).send(userdata);
  };

//access Token for update role,change password and delete of a user only admin can create-----------

const access = async (req, res) => {
    try {
      let userEmail = await userdatas.findOne({
        where: { userName: req.body.userName },
      });
      if (userEmail.role_Id == 1) {
        let date = new Date();
        const token = jwt.sign(
          { userName: userdatas.userName },
          process.env.jwtSecret.jwtSecret,
          { expiresIn: "10m" }
        );
        let tokens = {
          update_token: token,
        };
        const updateAccess = await updateToken.create(tokens);
        res.status(200).send({ Access_Token: updateAccess });
      } else {
        res.send("you are not a admin");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // // Update the user role by admin-------

const updateRole = async (req, res) => {
    try {
      let updateAccess = await updateToken.findOne({
        where: { update_token: req.body.update_token },
      });
      if (updateAccess) {
        const updateData = await userdatas.update(
          { role_Id: req.body.role_Id },
          { where: { userName: req.body.userName } }
        );
        res.status(200).send({ data: updateData });
      } else {
        res.send("Invalid token");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // //Admin can change password of any user by access token

const resetPassword = async (req, res) => {
    const { Password_Access_Token } = req.params;
    const userName = req.body.userName;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const isMatch = await updateToken.findOne({
      where: {
        update_token: Password_Access_Token,
      },
    });
    console.log(isMatch);
    if (password == confirmPassword) {
      if (isMatch != null) {
        const salt = await bcrypt.genSalt(10);
        const passwords = await bcrypt.hash(password, salt);
        const updateData = await userdatas.update(
          { password: passwords, confirmPassword: passwords },
          { where: { userName: userName } }
        );
        console.log(updateData);
        res.status(200).json({ success: true, msg: "Password has been changed" });
      } else {
        res
          .status(400)
          .json({ success: false, msg: "Password_Reset_Token is not verified" });
      }
    } else {
      res.status(400).json({ success: false, msg: "Password_Does not match" });
    }
  };
  
  // // // Admin assign users to manager
  
  const assignUser = async (req, res) => {
    try {
      const { id } = req.params
      console.log(id);
      const admin = await userdatas.findOne({ where: { id: id } });
      console.log(admin);
      if (admin.role_Id == 1) {
          const managerData = await userdatas.findOne({
            where: { email_id: req.body.email_id },
          });
          console.log(managerData.id);
          const userData = await userdatas.update(
            { managerId:managerData.id },
            { where: { userName: req.body.userName } }
          );
          res.status(200).send({ assignData: userData });
        // }
      } else {
        res.send({ message: "you are not a admin" });
      }
    } catch (error) {
      res.status(400).send({ message: error });
    }
  };

  // //Admin can delete user by access token----------------------

const deleteUser = async (req, res) => {
    try {
      const { delete_Access_Token } = req.params;
      const id = req.body.id;
      const accessedToken = await updateToken.findOne({
        where: { update_token: delete_Access_Token },
      });
      if (accessedToken) {
        console.log(id);
        await userdatas.destroy({ where: { id: id } });
        res.send("user has been deleted");
      } else {
        res.send("Invalid Token");
      }
    } catch (error) {
      res.send("user has not been deleted");
    }
  };

  //admin can see user task by user.id

const adminGetTasks = async (req, res) => {
    const admin = await userdatas.findOne({
      where: { id: req.params.id },
    });
    if (admin.role_Id == 1) {
      let userdata = await userdatas.findAll({
        include: [
          {
            model: userTask,
            as: "addTask",
          },
          {
            model: rolesData,
            as: "role",
          },
        ],
        where: { id: req.body.id },
      });
      res.status(200).send(userdata);
    } else {
      res.send("you are not able to see the task");
    }
  };
  

  module.exports = {
    addRole,
    registerUser,
    userLogin,
    getUserData,
    getAllData,
    access,
    updateRole,
    resetPassword,
    deleteUser,
    assignUser,
    adminGetTasks
  };