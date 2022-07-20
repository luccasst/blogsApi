const sequelize = require('sequelize');
const { Sequelize } = require('sequelize');

const userAttributes = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      displayName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING,
      },
}

module.exports = (sequelize) => {
    const user = sequelize.define('User', userAttributes, {
        timestamps: false,
    });
    user.associate = (models) => {
      user.hasMany(models.BlogPost, {
        as: 'posts',
        foreignKey: 'userId',
      })
    }


    return user;
};