const sequelize = require('sequelize');
const { Sequelize } = require('sequelize');

const blogPostsAttribute = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      content: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      published: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
      updated: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
}

module.exports = (sequelize) => {
    const blogPosts = sequelize.define('BlogPost', blogPostsAttribute, {
        timestamps: false,
    });
    
    blogPosts.associate = (models) => {

        blogPosts.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user',
        })
    }

    return blogPosts;
}