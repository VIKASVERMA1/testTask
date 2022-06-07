const adminController=require('../controller/admin_controller')
const validators = require("../validators/validation");


const router=require('express').Router()

//----------API for add role ------------

router.post('/role',adminController.addRole)

//-------router for register a user-----

router.post('/register',validators.userCreationValidator, adminController.registerUser)

//-------router for login a user---------

router.post('/login',adminController.userLogin)



//---------route for get All employee data---------

router.get('/getAllData',adminController.getAllData)


// //--------------route for generate access tokken for update a user role--------

router.post('/access',adminController.access)

// //-----------route for update the user role-----------------

router.post('/updateRole',adminController.updateRole)

// //---------reset password of any user----------------------

router.post('/updatePassword',adminController.resetPassword)

// //----------delete user by Admin------------------------

router.post('/deleteUser',adminController.deleteUser)

// //------------route for assign user to manager------

router.post('/assingUser/:id',adminController.assignUser)

//--------route for get all users task by admin-----

router.get('/adminSeeTask/:id',adminController.adminGetTasks)

module.exports=router

