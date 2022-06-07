const userDataDb = require("../models/user_schema");
const taskDb = require("../models/task_schema");


//create main model
const userdatas = userDataDb;
const userTask = taskDb;


// manager see all users that are assigned him----------

const seeUsers = async (req, res) => {
    try {
      const { id } = req.params;
      let managersData=await userdatas.findOne({where:{id:id}})
      let userdata = await userdatas.findAll({where: { managerId: id },});
      res.status(200).send({managerData:managersData,users:userdata});
    } catch (error) {
      res.status(400).send(error);
    }
  };

  // //create task list by manager
const addTask = async (req, res) => {
    try {
      const { id } = req.params;
      const users = await userdatas.findOne({ where: { id: id } });
      if (users.role_Id == 2) {
        let role = {
          task_Id: req.body.task_Id,
          task_Name: req.body.task_Name,
        };
        const task = await userTask.create(role);
        res.status(200).send(task);
      } else {
        res
          .status(200)
          .send({ message: "you are not able to create the task list" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // //get task list by manager------

const getAllTask = async (req, res) => {
    const manager = await userdatas.findOne({
      where: { userName: req.body.userName },
    });
    if (manager.role_Id == 2) {
      let userdata = await userTask.findAll({});
      res.status(200).send(userdata);
    } else {
      res.send("you are not able to see task list");
    }
  };
  

  // //delete task by id

const deleteTask = async (req, res) => {
    try {
      const usersData = await userdatas.findOne({
        where: { userName: req.body.userName },
      });
      if (usersData.role_Id == 2) {
        await userTask.destroy({ where: { task_Id: req.body.task_Id } });
        res.send("task has been deleted");
      } else {
        res.send("you are not able to delete the task");
      }
    } catch (error) {
      res.send("task has not been deleted");
    }
  };
  
  // //update task by id
  
  const updateTask = async (req, res) => {
    try {
      const usersData = await userdatas.findOne({
        where: { userName: req.body.userName },
      });
      if (usersData.role_Id == 2) {
        const updateData = await userdatas.update(
          { task_Name: req.body.task_Name },
          { where: { task_Id: req.body.task_Id } }
        );
        res.status(200).send("task has been updated");
      } else {
        res.send("you are not able to delete the task");
      }
    } catch (error) {
      res.send("task has not been updated");
    }
  };
  
  // //assign task to user by manager----
  
  const assignTask = async (req, res) => {
    try {
      const{id}=req.params
      const manager = await userdatas.findOne({
        where: { id: id },
      });
      if (manager.role_Id == 2) {
        const assignedTask = await userdatas.update(
          { task_Id: req.body.task_Id },
          { where: { email_id: req.body.email_id } }
        );
        res.send({ assignedTask: assignedTask });
      }
    } catch (err) {
      res.send({ message: err });
    }
  };
  

  //giving rating to users for their task work by manager

const givingRating = async (req, res) => {
    try {
      const { id } = req.params;
      const userId = await userdatas.findOne({ where: { id: id } });
      if (userId.role_Id == 2) {
        const rating = await userdatas.update(
          { rating: req.body.rating },
          { where: { userName: req.body.userName } }
        );
        res.send({ rating: rating });
      } else {
        res.send({ message: "you are not able to give rating to users" });
      }
    } catch (error) {
      res.status(400).send({ message: error });
    }
  };

  //--------API for unassign the task to user---------

  const unassignTask = async (req, res) => {
    try {
      const { id } = req.params;
      const user_id = req.body.id;
      const managerdata= await userdatas.findOne({
        where: { update_token: delete_Access_Token },
      });
      if ( managerdata.role_Id==2) {
        console.log(id);
        await userdatas.destroy({task_Id:req.body.task_Id},{ where: { id: user_id} });
        res.send(" task has been unassign");
      } else {
        res.send("you are not able to do this operation");
      }
    } catch (error) {
      res.send("user has not been deleted");
    }
  };

//--------API for change the status of user------------

  const ChangeStatus = async (req, res) => {
    try {
      const {id}=req.params
      const manager = await userdatas.findOne({
        where: { id: id },
      });
      if (manager.role_Id == 2) {
        const rating = await userdatas.update(
          { status: req.body.status },
          { where: { userName: req.body.userName } }
        );
        res.send({ rating: rating });
      } else {
        res.send({
          message: "you are not able to change the status of users",
        });
      }
    } catch (error) {
      res.status(400).send({ message: error });
    }
  };
  

  module.exports = {
    addTask,
    getAllTask,
    deleteTask,
    updateTask,
    assignTask,
    givingRating,
    seeUsers,
    unassignTask,
    ChangeStatus
  };