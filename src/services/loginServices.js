require('dotenv').config();
const jwt = require('jsonwebtoken');
const models = require('../database/models');

const authenticateLogin = {

    async authenticateLogin(email, password) {
        if (!email || !password) {
            return { status: 400, data: { message: 'Some required fields are missing' } };
        }

        const user = await models.User.findOne({
            where: { email, password },
        });
        if (!user) return { status: 400, data: { message: 'Invalid fields' } };
        
        const token = jwt.sign({ data: email }, process.env.JWT_SECRET);
        return { status: 200, data: { token } };
},
};
module.exports = authenticateLogin;