const Sequelize = require('sequelize')
const connection = require('../conection.js').sequelize

const recipe = require('./recipesDB')
const user = require('./usersDB')


const User_recipe = connection.define('user_recipe',{
    created: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      } 
},{
    timestamps: false
})

recipe.hasOne(User_recipe)
user.hasOne(User_recipe)

User_recipe.sync()

module.exports = User_recipe
