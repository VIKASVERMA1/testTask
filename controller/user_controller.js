const userDataDb = require("../models/user_schema");
const roleDb = require("../models/role_schema");
const taskDb = require("../models/task_schema");


//create main model
const userdatas = userDataDb;
const rolesData = roleDb;
const userTask = taskDb;


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


// //see user assigned task
const getAssignedTask = async (req, res) => {
  const manager = await userdatas.findOne({
    where: { userName: req.body.userName },
  });
  if (manager.role_Id == 3) {
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
      where: { email_id: req.body.email_id },
    });
    res.status(200).send(userdata);
  } else {
    res.send("you are not able to see the task");
  }
};


// // initialize status of the task by users-------------
const givingStatus = async (req, res) => {
  try {
    const{id}=req.params
    const user = await userdatas.findOne({
      where: { id: id },
    });
    if (user.role_Id == 3) {
      const rating = await userdatas.update(
        { status: req.body.status },
        { where: { userName: req.body.userName } }
      );
      res.send({ rating: rating });
    } else {
      res.send({
        message: "you are not able to initialize the status of users",
      });
    }
  } catch (error) {
    res.status(400).send({ message: error });
  }
};

module.exports = {
  getUserData,
  getAssignedTask,
  givingStatus,
};
