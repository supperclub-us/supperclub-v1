const router = require("express").Router();
const {
  models: { User, Booking, Cuisine, UsersBookings },
} = require("../db");
module.exports = router;

// BOOKINGS GET /api/bookings
router.get("/", async (req, res, next) => {
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
        {
          model: Cuisine,
        },
      ],
    });
    res.json(bookings);
  } catch (err) {
    next(err);
  }
});

// BOOKINGS GET /api/bookings/:id
router.get("/:id", async (req, res, next) => {
  try {
    const booking = await Booking.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: "chefBooking",
        },
        {
          model: User,
          as: "memberBooking",
        },
        {
          model: Cuisine,
        },
      ],
    });
    res.json(booking);
  } catch (err) {
    next(err);
  }
});

// BOOKINGS PUT /api/bookings/:bookingId/user/:userId
router.put("/:bookingId/user/:userId", async (req, res, next) => {
  try {
    const booking = await Booking.findByPk(req.params.bookingId, {
      include: [
        {
          model: User,
          as: "chefBooking",
        },
        {
          model: User,
          as: "memberBooking",
        },
        {
          model: Cuisine,
        },
      ],
    });
    const user = await User.findByPk(req.params.userId, {
      include: [
        {
          model: Booking,
          as: "memberBooking"
        }
      ]
    });
    if (!booking) {
      res.status(401).send("no booking available");
    }
    const { openSeats, reservedSeats } = req.body;
    console.log("API OPENSEATS", openSeats);
    console.log("API RESERVEDSEATS", reservedSeats);
    // req.body will need to take in the updated seats and reserved booking
    await booking.update({ openSeats });
    console.log("USER BACKEND", user)
    // update the UsersBookings as well with second parameter
    await booking.addMemberBooking(user, {
      through: { reservedSeats: reservedSeats },
    });
    res.status(201).json(await booking.reload()); //(user, {reservedBookings: reservedBooking})
  } catch (err) {
    next(err);
  }
});

// MEMBER BOOKINGS DELETE /api/bookings/:bookingId/user/delete/:userId
router.put("/:bookingId/user/delete/:userId", async (req, res, next) => {
  try {
    const booking = await Booking.findByPk(req.params.bookingId, {
      include: [
        {
          model: User,
          as: "chefBooking",
        },
        {
          model: User,
          as: "memberBooking",
        },
        {
          model: Cuisine,
        },
      ],
    });
    const user = await User.findByPk(req.params.userId);
    if (!booking) {
      res.status(401).send("no booking available");
    }
    const { openSeats } = req.body;
    await booking.update({ openSeats });
    await booking.removeMemberBooking(user);
    console.log("API NEW BOOKING", booking);
    res.status(201).json(await booking.reload());
  } catch (err) {
    next(err);
  }
});
