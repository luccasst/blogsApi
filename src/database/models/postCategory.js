const { Sequelize } = require('sequelize');

const attribute = {
    postId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'BlogPosts',
          key: 'id',
        },
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Categories',
          key: 'id',
        },
      },
    }

      module.exports = (sequelize) => {
        const postCategory = sequelize.define('PostCategory', attribute, {
            timestamps: false,
        });

        postCategory.associate = (models) => {
            models.BlogPost.belongsToMany(models.Category, {
                foreignKey: 'categoryId',
                as: 'categories',
                through: postCategory,
                otherKey: 'postID',
            })

            models.Category.belongsToMany(models.BlogPost, {
                foreignKey: 'postId',
                as:'posts',
                through: postCategory,
                otherKey: 'categoryId',
            })
        }

        return postCategory
}