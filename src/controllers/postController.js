const authorization = require('../middlewares/authorization');
const postService = require('../services/postService');

const postController = {
    async create(req, res) {
      const idUser = authorization.tokenData(req.headers.authorization);
      const { status, data } = await postService.create(req.body, idUser.data);
       return res.status(status).json(data);
    },

    async getAll(_req, res) {
        const post = await postService.getAll();
        res.json(post);
},

};

module.exports = postController;