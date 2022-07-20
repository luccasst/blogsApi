const { Router } = require('express');
const userController = require('../controllers/userController');

const userRouter = Router();

userRouter.get('/', userController.getAll);
userRouter.post('/', userController.create);

module.exports = userRouter;