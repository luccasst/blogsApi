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

    async getById(req, res) {
       const { id } = req.params;
       const { status, data } = await userService.getById(id);
       return res.status(status).json(data);
    },
};

module.exports = userController;