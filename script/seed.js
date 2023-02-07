const {
  db,
  models: { User, Booking, Cuisine, UsersBookings },
} = require("../server/db");

const { bookingData } = require("./bookingData")

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

  const bookings = await Promise.all(bookingData.map(booking=>Booking.create(booking)))
  console.log("bookings!!!!!:LKSJD F:LKJSD:", bookings[0])
  // USERS BOOKINGS JOIN TABLE - magic methods


  // await richard.addMemberBooking(bookings[0], {
  //   as: "memberBooking",
  //   through: "users_bookings",
  // });
  // await richard.addMemberBooking(bookings[3], {
  //   as: "memberBooking",
  //   through: "users_bookings",
  // });
  // await richard.addMemberBooking(bookings[6], {
  //   as: "memberBooking",
  //   through: "users_bookings",
  // });
  // await richard.addMemberBooking(bookings[18], {
  //   as: "memberBooking",
  //   through: "users_bookings",
  // });
  // await roy.addMemberBooking(bookings[0], {
  //   as: "memberBooking",
  //   through: "users_bookings",
  // });
  // await roy.addMemberBooking(bookings[8], {
  //   as: "memberBooking",
  //   through: "users_bookings",
  // });
  // await roy.addMemberBooking(bookings[10], {
  //   as: "memberBooking",
  //   through: "users_bookings",
  // });
  // await roy.addMemberBooking(bookings[19], {
  //   as: "memberBooking",
  //   through: "users_bookings",
  // });
  // await sarah.addMemberBooking(bookings[0], {
  //   as: "memberBooking",
  //   through: "users_bookings",
  // });
  // await sarah.addMemberBooking(bookings[1], {
  //   as: "memberBooking",
  //   through: "users_bookings",
  // });
  // await sarah.addMemberBooking(bookings[6], {
  //   as: "memberBooking",
  //   through: "users_bookings",
  // });
  // await sarah.addMemberBooking(bookings[17], {
  //   as: "memberBooking",
  //   through: "users_bookings",
  // });
  // await sarah.addMemberBooking(bookings[20], {
  //   as: "memberBooking",
  //   through: "users_bookings",
  // });
  // await robert.addMemberBooking(bookings[16], {
  //   as: "memberBooking",
  //   through: "users_bookings",
  // });
  // await robert.addMemberBooking(bookings[14], {
  //   as: "memberBooking",
  //   through: "users_bookings",
  // });
  // await robert.addMemberBooking(bookings[12], {
  //   as: "memberBooking",
  //   through: "users_bookings",
  // });
  // await robert.addMemberBooking(bookings[21], {
  //   as: "memberBooking",
  //   through: "users_bookings",
  // });

  // await joe.addMemberBooking(bookings[2], {
  //   as: "memberBooking",
  //   through: "users_bookings",
  // });
  // await joe.addMemberBooking(bookings[4], {
  //   as: "memberBooking",
  //   through: "users_bookings",
  // });
  // await joe.addMemberBooking(bookings[6], {
  //   as: "memberBooking",
  //   through: "users_bookings",
  // });
  // await joe.addMemberBooking(bookings[22], {
  //   as: "memberBooking",
  //   through: "users_bookings",
  // });
  // await david.addMemberBooking(bookings[2], {
  //   as: "memberBooking",
  //   through: "users_bookings",
  // });
  // await david.addMemberBooking(bookings[8], {
  //   as: "memberBooking",
  //   through: "users_bookings",
  // });
  // await david.addMemberBooking(bookings[9], {
  //   as: "memberBooking",
  //   through: "users_bookings",
  // });
  // await david.addMemberBooking(bookings[22], {
  //   as: "memberBooking",
  //   through: "users_bookings",
  // });

  // BOOKING RESERVATIONS:
  const usersBookings = [
    {memberId: 3, bookingId: 1, reservedSeats: 1},
    {memberId: 3, bookingId: 4, reservedSeats: 6},
    {memberId: 3, bookingId: 7, reservedSeats: 3},
    {memberId: 4, bookingId: 1, reservedSeats: 1},
    {memberId: 4, bookingId: 9, reservedSeats: 1},
    {memberId: 4, bookingId: 11, reservedSeats: 1},
    {memberId: 4, bookingId: 20, reservedSeats: 3},
    {memberId: 5, bookingId: 1, reservedSeats: 1},
    {memberId: 5, bookingId: 2, reservedSeats: 2},
    {memberId: 5, bookingId: 7, reservedSeats: 3},
    {memberId: 5, bookingId: 18, reservedSeats: 2},
    {memberId: 5, bookingId: 21, reservedSeats: 13},
    {memberId: 6, bookingId: 17, reservedSeats: 7},
    {memberId: 6, bookingId: 15, reservedSeats: 5},
    {memberId: 6, bookingId: 13, reservedSeats: 2},
    {memberId: 6, bookingId: 22, reservedSeats: 8},
    {memberId: 1, bookingId: 3, reservedSeats: 1},
    {memberId: 1, bookingId: 5, reservedSeats: 4},
    {memberId: 1, bookingId: 7, reservedSeats: 2},
    {memberId: 1, bookingId: 23, reservedSeats: 2},
    {memberId: 2, bookingId: 3, reservedSeats: 1},
    {memberId: 2, bookingId: 9, reservedSeats: 1},
    {memberId: 2, bookingId: 10, reservedSeats: 6},
    {memberId: 2, bookingId: 23, reservedSeats: 1}
  ]

  await Promise.all(usersBookings.map(userBooking => UsersBookings.create(userBooking)))

  // CHEF CUISINES
  // 7, 8, 9
  await chefNick.addCuisine(cuisines[6], { through: "chef_cuisine" });
  await chefNick.addCuisine(cuisines[7], { through: "chef_cuisine" });
  await chefNick.addCuisine(cuisines[8], { through: "chef_cuisine" });
  await chefEllie.addCuisine(cuisines[3], { through: "chef_cuisine" });
  await chefEllie.addCuisine(cuisines[4], { through: "chef_cuisine" });
  await chefEllie.addCuisine(cuisines[5], { through: "chef_cuisine" });
  await chefJames.addCuisine(cuisines[1], { through: "chef_cuisine" });
  await chefJames.addCuisine(cuisines[2], { through: "chef_cuisine" });
  await chefJames.addCuisine(cuisines[7], { through: "chef_cuisine" });

  // USER REVIEWS
  // GOLD LEVEL

  console.log(`There are currently ${bookings.length} bookings in the country`)
  console.log(`seeded ${cuisines.length} cuisines`);
  console.log("USER MAGIC METHODS: ", Object.keys(User.prototype));
  console.log("CUISINE MAGIC METHODS: ", Object.keys(User.prototype));
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


25-29