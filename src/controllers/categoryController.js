const categoryService = require('../services/categoryService');

const categoryController = {
    async create(req, res) {
      const { status, data } = await categoryService.create(req.body);
       return res.status(status).json(data);
    },

    async getAll(_req, res) {
        const user = await categoryService.getAll();
        res.json(user);
},

};

module.exports = categoryController;