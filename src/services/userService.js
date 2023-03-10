const Joi = require('joi');
const jwt = require('jsonwebtoken');
const models = require('../database/models');
const validateErr = require('./utils');
require('dotenv').config();

const users = Joi.object({
    displayName: Joi.string().min(8).required().messages({
        'string.min': '400|"displayName" length must be at least 8 characters long',
    }),
    email: Joi.string().email().required().messages({
        'string.email': '400|"email" must be a valid email',
    }),
    password: Joi.string().min(6).messages({
        'string.min': '400|"password" length must be at least 6 characters long',
    }),
    image: Joi.string(),
});

const user = {
    async create(value) {
        const isValidateError = validateErr(users)(value);
        if (isValidateError) {
            return { status: isValidateError[0], json: { message: isValidateError[1] } };
        }
        const registedEmail = await models.User.findOne({ where: { email: value.email } });
        if (registedEmail) return { status: 409, json: { message: 'User already registered' } };

       const newUser = await models.User.create(value, { raw: true });
       const { dataValue: { id } } = newUser;
       const token = jwt.sign({ json: id }, process.env.JWT_SECRET);

        return { status: 201, json: { token } };
    },

    async getAll() {
        return models.User.findAll({ attributes: { exclude: ['password'] } });
    },

    async getById(id) {
        const userFind = await models.User.findByPk(id, { raw: true });
        if (!userFind) {
            return { status: 404, data: { message: 'User does not exist' } };
        }
        const { password, ...userData } = userFind;
        return { status: 200, data: userData };
    },
};
module.exports = user;
