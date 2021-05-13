const Sequelize = require('sequelize')
const connection = require('../conection.js').sequelize

const recipe = require('./recipesDB')
const category = require('./categoryBD')

const Category_recipe = connection.define('category_recipe',{
  
},{
    timestamps: false

})

recipe.hasOne(Category_recipe)
category.hasOne(Category_recipe)

Category_recipe.sync()
module.exports = Category_recipe