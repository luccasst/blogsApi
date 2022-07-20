 const userService = require('../services/userService');

const userController = {
    async create(req, res) {
        const { status, json } = await userService.create(req.body);
        res.status(status).json(json);
    },

    async getAll(_req, res) {
        const users = await userService.getAll();
        return res.json(users);
    },
};
module.exports = userController;