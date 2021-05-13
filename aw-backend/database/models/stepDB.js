const Sequelize = require('sequelize')
const connection = require('../conection.js').sequelize
const Recipes = require('./recipesDB')

const Step = connection.define('steps',{
   
    title: {
        type: Sequelize.STRING,
        allowNull: true
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    ordernum: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  },{
    timestamps: false
  })

  Step.belongsTo(Recipes)
  Step.sync()

  module.exports = Step