const express = require('express');
const { userController, loginController, registerController } = require('../controllers/userControllers');
const userRouter = express.Router();

userRouter.post('/login', loginController)
userRouter.post('/register', registerController)

userRouter.get('', userController.getAllUser)

module.exports = userRouter