const router = require("express").Router();
const {
  models: { User, Booking },
} = require("../db");
module.exports = router;


// BOOKINGS GET /api/bookings
router.get("/bookings", async (req, res, next) => {
  try {
    const bookings = await Booking.findAll({
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
    res.json(bookings);
  } catch (err) {
    next(err);
  }
});

// BOOKINGS GET /api/bookings/:id
router.get("/bookings/:id", async (req, res, next) => {
  try {
    const booking = await booking.findByPk()
  } catch (err) {
    next (err);
  }
})
