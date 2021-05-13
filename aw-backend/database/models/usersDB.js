const Sequelize = require('sequelize')
const connection = require('../conection.js').sequelize



const User = connection.define('users', {
   
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    surname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    surname2: {
        type: Sequelize.STRING,
        allowNull: false
    },
    birthDate: {
        type: Sequelize.DATE,
        allowNull: true,
    },
    userName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    about: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    level: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    experience: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    recipes: {
        type: Sequelize.STRING,
        allowNull: true
    },
    activationCode: {
        type: Sequelize.STRING,
        allowNull: false
    },
    activated: {
        type: Sequelize.BOOLEAN
    }
},{
    timestamps: false
})

User.sync()
module.exports = User

