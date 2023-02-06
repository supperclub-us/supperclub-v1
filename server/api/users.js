const router = require("express").Router();
const {
  models: { User, Booking },
} = require("../db");
module.exports = router;

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).send("Access denied");
    }
    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

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
    res.json(member);
  } catch (err) {
    next(err);
  }
});

// MEMBERS GET/api/users/members/:id/bookings
router.get("/members/:id/bookings", async (req, res, next) => {
  try {
    const member = await User.findByPk(req.params.id, {
      include: [
        {
          model: Booking,
          as: "memberBooking",
        },
      ],
    });
    const { memberBooking } = member;
    res.json(memberBooking);
  } catch {
    next(err);
  }
});

// MEMBERS POST /api/users/members/:id/bookings
router.post("/members/:id/bookings", async (req, res, next) => {
  try {
    const member = await User.findByPk(req.params.id, {
      include: [
        {
          model: Booking,
          as: "memberBooking",
        },
      ],
    });
    console.log("REQ BODY!!!", req.body);
    res.status(201).json(
      member.addMemberBooking(req.body.id, {
        as: "memberBooking",
        through: "users_bookings",
      })
    );
  } catch (err) {
    next(err);
  }
});

// CHEFS GET /api/users/chefs/:id
router.get("/chefs/:id", async (req, res, next) => {
  try {
    const chef = await User.findByPk(req.params.id, {
      where: {
        role: "CHEF",
      },
      include: [
        {
          model: Booking,
          as: "chefBooking",
        },
      ],
    });
    if (chef.role === "CHEF") {
      res.json(chef);
    } else {
      throw new Error("Not Authenticated");
    }
  } catch (err) {
    next(err);
  }
});

// CHEFS BOOKINGS GET /api/users/chefs/:id/bookings
router.get("/chefs/:id/bookings", async (req, res, next) => {
  try {
    const chef = await User.findByPk(req.params.id, {
      where: {
        role: "CHEF",
      },
      include: [
        {
          model: Booking,
          as: "chefBooking",
        },
      ],
    });
    if (chef.role === "CHEF") {
      const { chefBooking } = chef;
      res.json(chefBooking);
    } else {
      throw new Error("Not Authenticated");
    }
  } catch (err) {
    next(err);
  }
});

// CHEFS BOOKINGS POST /api/users/chefs/:id/bookings
router.post("/chefs/:id/bookings", async (req, res, next) => {
  try {
    // might need to add authentication here to make sure the user is the user and adding to their own booking rather than someone else's!!
    const chef = await User.findByPk(req.params.id, {
      where: {
        role: "CHEF",
      },
      include: [
        {
          model: Booking,
          as: "chefBooking",
        },
      ],
    });
    if (chef.role === "CHEF") {
      console.log("REQ BODY", req.body);
      res.status(201).json(await Booking.create(req.body));
    } else {
      throw new Error("Not Authenticated");
    }
  } catch (err) {
    next(err);
  }
});

// CHEFS BOOKINGS PUT /api/users/chefs/:id/bookings/:bookingId
router.put("/chefs/:id/bookings/:bookingId", async (req, res, next) => {

  console.log("REQ BODY", req.body)

  try {
    const chef = await User.findByPk(req.params.id, {
      where: {
        role: "CHEF",
      },
      include: [
        {
          model: Booking,
          as: "chefBooking",
        },
      ],
    });
    
    // console.log("CHEF-->", chef)

    if (chef.role === "CHEF") {
      const booking = await Booking.findByPk(req.params.bookingId);
      res.json(await booking.update(req.body));
    } else {
      throw new Error("Not Authenticated");
    }
  } catch (err) {
    next(err);
  }
})