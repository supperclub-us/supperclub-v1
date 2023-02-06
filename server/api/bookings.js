const router = require("express").Router();
const {
  models: { User, Booking, Cuisine },
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
          model: Cuisine
        }
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
          model: Cuisine
        }
      ],
    });
    res.json(booking)
  } catch (err) {
    next (err);
  }
})

// BOOKINGS PUT /api/bookings/:id
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
          model: Cuisine
        }
      ]
    })

    console.log("booking put req in api folder BEFORE DECREMENT --->", booking)

    const user = await User.findByPk(req.params.userId)
    
    await booking.update(req.body)

    console.log("booking put req in api folder --->", booking)
    console.log("user put req in api folder --->", user)

    res.status(201).json(await booking.addMemberBooking(user))
  }
  catch(err){
    next(err)
  }
})