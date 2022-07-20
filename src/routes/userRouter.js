const { Router } = require('express');
const userController = require('../controllers/userController');
const authorization = require('../middlewares/authentication');

const userRouter = Router();

userRouter.get('/', authorization, userController.getAll);
userRouter.post('/', userController.create);

module.exports = userRouter;