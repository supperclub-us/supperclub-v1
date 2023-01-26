const router = require("express").Router();
const {
  models: { User, Booking, Cuisine },
} = require("../db");
module.exports = router;

// USERS GET /api/users
router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// CHEFS GET /api/users/chefs
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

// MEMBERS GET /api/users/members
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

// --------------------------------------------------------------//
// MEMBERS GET /api/users/members/:id
router.get("/members/:id", async (req, res, next) => {
  try {
    const member = await User.findByPk(req.params.id, {
      include: [
        {
          model: Booking,
          as: "memberBooking",
        },
      ],
    });
    res.json(member)
  } catch (err) {
    next (err);
  }
})

// MEMBERS GET /api/users/chefs/:id
router.get("/chefs/:id", async (req, res, next) => {
  try {
    const chef = await User.findByPk(req.params.id, {
      where: {
        role: "CHEF"
      },
      include: [
        {
          model: Booking,
          as: "chefBooking",
        },
      ],
    });
    if (chef.role === "CHEF"){

    }
    res.json(chef)
  } catch (err) {
    next (err);
  }
})
