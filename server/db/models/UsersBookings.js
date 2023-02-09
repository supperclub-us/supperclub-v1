const Sequelize = require('sequelize')
const db = require('../db')

const UsersBookings = db.define("users_bookings", {
    reservedSeats: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

module.exports = UsersBookings
