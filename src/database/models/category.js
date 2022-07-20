const { Sequelize } = require('sequelize');

const categoryAttributes = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
   name: {
    type: Sequelize.STRING,
   } 
} 

module.exports = (sequelize) => {
    const categories = sequelize.define('Category', categoryAttributes, {
        timestamps: false,
    });
    return categories;
}