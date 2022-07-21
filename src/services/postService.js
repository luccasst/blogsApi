const Joi = require('joi');
const models = require('../database/models');
const validateErr = require('./utils');
require('dotenv').config();

const postSchema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categoryIds: Joi.array().required(),
});

const verifyCategory = async (categories) => {
    const categoriesFind = await Promise.all(
        categories.map(async (category) => models.Category.findByPk(category, { raw: true })),
    );
    const categorieExist = categoriesFind.filter((category) => category != null);
    if (categorieExist.length > 0) return categorieExist;
    return false;
};

const post = { 
    async create(value, userId) {
        const valiError = validateErr(postSchema)(value);
       if (valiError) return { status: 400, data: { message: 'Some required fields are missing' } };

       const categorieExist = await verifyCategory(value.categoryIds);
       if (!categorieExist) return { status: 400, data: { message: '"categoryIds" not found' } };
       const postValue = {
        title: value.title,
        content: value.content,
        userId,
       };
       const newPost = await models.BlogPost.create(postValue);
      
       Promise.all(
        categorieExist.map(async ({ id }) => models.PostCategory
        .create({ postId: newPost.id, categoryId: id })),
       );
        
       return { status: 201, data: newPost };
    },

    async getAll() {
        return models.BlogPost.findAll(
            {
                include: [
                    { model: models.User, as: 'user', attributes: { exclude: ['password'] } },
                    { model: models.Category, as: 'categories' },
                ],
            },
        );
    },
};

module.exports = post;