const router = require("express").Router();
const {
  models: { User, Booking, Cuisine },
} = require("../db");
module.exports = router;

// USERS GET
router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// CHEFS
router.get("/chefs", async (req, res, next) => {
  try {
    const users = await User.findAll({
      where: {
        role: "CHEF",
      },
      include: {
        model: Booking,
        as: "chefBooking",
      },
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// MEMBERS
router.get("/members", async (req, res, next) => {
  try {
    const users = await User.findAll({
      where: {
        role: "MEMBER",
      },
      include: {
        model: Booking,
        as: "memberBooking",
      },
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// MEMBERS
router.get("/bookings", async (req, res, next) => {
  try {
    const booking = await Booking.findAll({
      include: [
        {
          model: User,
          as: "chefBooking",
        },
        {
          model: User,
          as: "memberBooking",
        },
      ],
    });

    // go through array and SQL calls to get each author and map over to create new array of object

    res.json(booking);
  } catch (err) {
    next(err);
  }
});
