const { Router } = require('express');
const userController = require('../controllers/userController');
const authorization = require('../middlewares/authorization');

const userRouter = Router();

userRouter.get('/', authorization.getUser, userController.getAll);
userRouter.get('/:id', authorization.getUser, userController.getById);
userRouter.post('/', userController.create);

module.exports = userRouter;