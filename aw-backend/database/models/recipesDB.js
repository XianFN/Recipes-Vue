const Sequelize = require('sequelize')
const connection = require('../conection.js').sequelize

const Recipe = connection.define('recipes', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    image: {
        type: Sequelize.BLOB,
        allowNull: true,
        get() {
            console.log("asd")
            return new Buffer(this.getDataValue('image')).toString('base64')
            
        }

    },
    people: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    time: {
        type: Sequelize.INTEGER,
        allowNull: true
    },

    countcalories: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    totalrating: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    peoplerating: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    media: {
        type: Sequelize.DOUBLE,
        allowNull: false
    }


}, {
    timestamps: false
})

Recipe.sync()

module.exports = Recipe