const userController=require('../controller/userController')





const router=require('express').Router()

//-------------route for creating role------------

router.post('/role',userController.addRole)

//---------route for creating a user---------

router.post('/register',userController.registerUser)

//--------route for get userData by username-----------

router.post('/getData',userController.getUserData)

// //--------route for get AllData-----------

router.get('/getAllData',userController.getAllData)

// //--------------route for generate access tokken for update a user role--------

router.post('/access',userController.access)

// //-----------route for update the user role-----------------

router.post('/updateRole',userController.updateRole)

// //---------reset password of any user----------------------

router.post('/updatePassword',userController.resetPassword)

// //----------delete user by Admin------------------------

router.post('/deleteUser',userController.deleteUser)

// //------------route for assign user to manager------

router.post('/assingUser/:id',userController.assignUser)

// //-----------route for add task-------------------------

router.post('/addTask/:id',userController.addTask)

// //---------route for get task list-----------------

router.post('/getAllTask',userController.getAllTask)

// //-------route for delete task -------------

router.post('/deleteTask',userController.deleteTask)

// //-------route for update the task ---------------

router.post('/updateTask',userController.updateTask)

// //----------route for assign task to user--------

router.post('/assignTask',userController.assignTask)

// //----------route for get allAssigend task-------
router.post('/getAssignedTask',userController.getAssignedTask)

// //----------route for giving rating to users-----------

router.post('/rating/:id',userController.givingRating)

// //---------route for initialize the status of users----

router.post('/status',userController.givingStatus);

//---------route for see assign users to manager----

router.get('/seeUsers/:id',userController.seeUsers)

//--------route for get all users task by admin-----

router.get('/adminSeeTask/:id',userController.adminGetTasks)


module.exports=router