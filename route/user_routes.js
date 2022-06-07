const userController=require('../controller/user_controller')


const router=require('express').Router()


//------router for getUserData------------

router.get('/getUserData',userController.getUserData)

//-----------router for getAssigned Task-----------

router.post('/getAssignedtask',userController.getAssignedTask)

//--------------router for giving Status-----------

router.post('/givingStatus/:id',userController.givingStatus)

module.exports=router