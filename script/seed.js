const {
  db,
  models: { User, Booking, Cuisine, UsersBookings },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  // 1
  const joe = await User.create({
    role: "MEMBER",
    firstName: "Joe",
    lastName: "Holder",
    bio: "montana man!",
    mobileNumber: "555-555-5555",
    email: "joe@gmail.com",
    password: "123456",
  });
  // 2
  const david = await User.create({
    role: "MEMBER",
    firstName: "David",
    lastName: "Cheung",
    bio: "I like my cruises!",
    mobileNumber: "555-555-5555",
    email: "david@gmail.com",
    password: "123456",
  });
  // 3
  const richard = await User.create({
    role: "MEMBER",
    firstName: "Richard",
    lastName: "Young",
    bio: "super cool",
    mobileNumber: "555-555-5555",
    email: "richard@gmail.com",
    password: "123456",
  });
  // 4
  const roy = await User.create({
    role: "MEMBER",
    firstName: "Roy",
    lastName: "Galanz",
    bio: "super hip guy",
    mobileNumber: "555-555-5555",
    email: "roy@gmail.com",
    password: "123456",
  });
  // 5
  const sarah = await User.create({
    role: "MEMBER",
    firstName: "Sarah",
    lastName: "Roberts",
    bio: "yooyoyoyoyoy!",
    mobileNumber: "555-555-5555",
    email: "sarah@gmail.com",
    password: "123456",
  });
  // 6
  const robert = await User.create({
    role: "MEMBER",
    firstName: "Robert",
    lastName: "Downey-Junior",
    bio: "yooyoyoyoyoy!",
    mobileNumber: "555-555-5555",
    email: "robert@gmail.com",
    password: "123456",
  });

  // CHEFS
  // 7
  const chefNick = await User.create({
    role: "CHEF",
    firstName: "Nick",
    lastName: "Aguila",
    bio: "The man from Chile!",
    mobileNumber: "555-555-5555",
    email: "nick@gmail.com",
    password: "123456",
  });
  // 8
  const chefEllie = await User.create({
    role: "CHEF",
    firstName: "Ellie",
    lastName: "Tirado",
    bio: "Yahoo! I love Ohio",
    mobileNumber: "555-555-5555",
    email: "ellie@gmail.com",
    password: "123456",
  });

  const chefJames = await User.create({
    role: "CHEF",
    firstName: "James",
    lastName: "Yates",
    bio: "TACO TIME! Best Tacos in Utah, guarenteed",
    mobileNumber: "555-555-5555",
    email: "james@gmail.com",
    password: "123456",
  });

  // CUISINES
  const cuisines = await Promise.all([
    Cuisine.create({
      category: "chinese",
    }),
    Cuisine.create({
      category: "japanese",
    }),
    Cuisine.create({
      category: "indian",
    }),
    Cuisine.create({
      category: "french",
    }),
    Cuisine.create({
      category: "thai",
    }),
    Cuisine.create({
      category: "nigerian",
    }),
    Cuisine.create({
      category: "brazilian",
    }),
    Cuisine.create({
      category: "mexican",
    }),
    Cuisine.create({
      category: "italian",
    }),
  ]);

  // Bookings of Chefs
  const booking1 = await Booking.create({
    title: "Delicious Mexican cuisine!",
    menu: "A nice blend of - tacos and peanut butter in your burritos!",
    startDateTime: "1/1/2023 5:30PM",
    endDateTime: "1/1/2023 7:30PM",
    maxSeats: 5,
    openSeats: 3,
    address1: "567 Main St",
    city: "Boston",
    state: "MA",
    zipCode: 55555,
    chefId: 7,
    cuisineId: 8,
  });
  const booking2 = await Booking.create({
    title: "Great East Asian Cuisine!",
    menu: "A nice blend of xyz",
    startDateTime: "1/1/2023 5:30PM",
    endDateTime: "1/1/2023 7:30PM",
    maxSeats: 5,
    openSeats: 3,
    address1: "123 Main St",
    city: "New York",
    state: "NY",
    zipCode: 20314,
    chefId: 8,
    cuisineId: 5,
  });
  const booking3 = await Booking.create({
    title: "Best Tacos in the Salt Lake City Area",
    menu: "It comes with Peanut Butter",
    startDateTime: "1/1/2023 5:30PM",
    endDateTime: "1/1/2023 7:30PM",
    maxSeats: 5,
    openSeats: 3,
    address1: "123 Main St",
    city: "Salt Lake",
    state: "UT",
    zipCode: 20314,
    chefId: 9,
    cuisineId: 5,
  });

  // USERS BOOKINGS JOIN TABLE - magic methods
  await richard.addMemberBooking(booking1, {
    as: "memberBooking",
    through: "users_bookings",
  });
  await roy.addMemberBooking(booking1, {
    as: "memberBooking",
    through: "users_bookings",
  });
  await sarah.addMemberBooking(booking1, {
    as: "memberBooking",
    through: "users_bookings",
  });
  await sarah.addMemberBooking(booking2, {
    as: "memberBooking",
    through: "users_bookings",
  });
  await robert.addMemberBooking(booking2, {
    as: "memberBooking",
    through: "users_bookings",
  });

  await joe.addMemberBooking(booking3, {
    as: "memberBooking",
    through: "users_bookings",
  });
  await david.addMemberBooking(booking3, {
    as: "memberBooking",
    through: "users_bookings",
  });

  console.log(`seeded ${cuisines.length} cuisines`);

  console.log("USER MAGIC METHODS: ", Object.keys(User.prototype));
  console.log("BOOKING MAGIC METHODS: ", Object.keys(Booking.prototype));
  console.log(`seeded successfully`);
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
