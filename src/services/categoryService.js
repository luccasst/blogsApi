const Joi = require('joi');
const models = require('../database/models');
const validateErr = require('./utils');
require('dotenv').config();

const categorys = Joi.object({
    name: Joi.string().required().messages({
        'any.required': '400|"name" is required',
    }),
});

    const category = {
        async create(value) {
         const isValidateError = validateErr(categorys)(value);
        if (isValidateError) {
            return { status: isValidateError[0], data: { message: isValidateError[1] } };
        }
        const categoryNew = await models.Category.create({ name: value.name });
        return { status: 201, data: categoryNew };
    },
     async getAll() {
    return models.Category.findAll();
}, 

};

module.exports = category;