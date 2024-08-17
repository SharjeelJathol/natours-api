const express=require("express")

// express Router
const router=express.Router()

const userController=require('../controllers/userController')

router 
    .route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser)

router
    .route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser)

module.exports=router;