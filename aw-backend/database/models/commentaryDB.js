const Sequelize = require('sequelize')
const connection = require('../conection.js').sequelize

const Recipes = require('./recipesDB')
const Users = require('./usersDB')

const Commentary = connection.define('commentaries',{
   
    commentary: {
        type: Sequelize.STRING,
        allowNull: true
    },
    rate: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    isCommentary: { 
      type: Sequelize.INTEGER,
      allowNull: false
    },
  isRated: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
  },{
    timestamps: false
  })
  Commentary.belongsTo(Recipes)
  Commentary.belongsTo(Users)
  Commentary.sync()
  module.exports = Commentary