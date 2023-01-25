//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Booking = require('./models/Booking')
const Cuisine = require('./models/Cuisine')

//associations could go here!

// Many-to-Many b/t Member and Booking
// ?Do we need a user table?
// ?Need alias for "member"?
User.belongsToMany(Booking, {
  through: "users_bookings",
  foreignKey: "memberId",
  otherKey: "bookingId"
});
Booking.belongsToMany(User, {
  through: "users_bookings",
  foreignKey: "bookingId",
  otherKey: "memberId"
});
User.hasMany(Booking, {
  foreignKey: "chefId"
});
Booking.belongsTo(User, {
  foreignKey: "chefId"
});

// Many-to-Many b/t User and User (Member and Chef)
User.belongsToMany(User, {
  as: 'Member',
  through: 'chef_reviews',
  foreignKey: "memberId"
})
User.belongsToMany(User, {
  as: 'Chef',
  through: 'chef_reviews',
  foreignKey: "chefId"
})

// Many-to-Many b/t Chef and Cuisine
User.belongsToMany(Cuisine, {
  through: "chef_cuisine",
  foreignKey: "chefId",
  otherKey: "cuisineId"
});
Cuisine.belongsToMany(User, {
  through: "chef_cuisine",
  foreignKey: "cuisineId",
  otherKey: "chefId"
});

// One-to-Many b/t Cuisine and Booking
Cuisine.hasMany(Booking);
Booking.belongsTo(Cuisine);


module.exports = {
  db,
  models: {
    User,
    Booking,
    Cuisine
  },
}
