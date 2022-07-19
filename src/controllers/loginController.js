const loginService = require('../services/loginServices');

const authenticateLogin = {
    async authenticateLogin(req, res) {
        const { email, password } = req.body;
        const { status, data } = await loginService.authenticateLogin(email, password);
        res.status(status).json(data);
       },
};

module.exports = authenticateLogin;