const Sequelize = require('sequelize')
const connection = require('../conection.js').sequelize




const Ingredient = connection.define('ingredients', {
  
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    calories: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
},{
    timestamps: false
})

Ingredient.sync()
module.exports = Ingredient