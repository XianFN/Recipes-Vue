const Sequelize = require('sequelize')
const connection = require('../conection.js').sequelize

const Category = connection.define('category',{
   
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    ammount: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
  },{
    timestamps: false
  })

  Category.sync()
  module.exports = Category