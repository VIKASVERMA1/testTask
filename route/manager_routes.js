const managerController=require('../controller/manager_controller')



const router=require('express').Router()

//---------route for see assign users to manager----

router.get('/seeUsers/:id',managerController.seeUsers)

// //-----------route for add task-------------------------

router.post('/addTask/:id',managerController.addTask)

// //---------route for get task list-----------------

router.post('/getAllTask',managerController.getAllTask)

// //-------route for delete task -------------

router.post('/deleteTask',managerController.deleteTask)

// //-------route for update the task list ---------------

router.post('/updateTask',managerController.updateTask)

// //----------route for assign task to user--------

router.post('/assignTask/:id',managerController.assignTask)

// //----------route for giving rating to users-----------

router.post('/rating/:id',managerController.givingRating)

//---------route for unassign the task to user-----------

router.post('/unassign/:id',managerController.unassignTask)

//---------route for change the status of user-----------

router.post('/changeStatus/:id',managerController.ChangeStatus)

module.exports=router

