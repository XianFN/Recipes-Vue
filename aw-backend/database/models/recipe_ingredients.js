const Sequelize = require('sequelize')
const connection = require('../conection.js').sequelize

const recipe = require('./recipesDB')
const ingredient = require('./ingredientsDB')

const Recipe_ingredients = connection.define('recipe_ingredients',{
    ammount: {
        type: Sequelize.INTEGER,
        allowNull: false
      } 
},{
    timestamps: false

})

recipe.hasOne(Recipe_ingredients)
ingredient.hasOne(Recipe_ingredients)

Recipe_ingredients.sync()
module.exports = Recipe_ingredients