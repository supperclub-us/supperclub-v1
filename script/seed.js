'use strict'

const { db, models: { User, Booking, Cuisine } } = require('../server/db')

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  //User order keeps switching!
  // Need to capture lat/long.
  // Fix zip code?

  // Creating Users
  const users = await Promise.all([
    User.create({ role: 'MEMBER', firstName: 'Tim', lastName: "Toolman", bio: "I like to eat great food!", mobileNumber: "(555)555-5555", email: "tim@email.com", password: "123" }),
    User.create({ role: 'CHEF', firstName: 'Guy', lastName: "Fieri", bio: "Great eats, great times!", mobileNumber: "(555)555-5555", email: "guy@email.com", password: "123" }),
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)

  const cuisines = await Promise.all([
    Cuisine.create({ category: "Italian" }),
    Cuisine.create({ category: "Chilean" })
  ]);

  console.log(`seeded ${cuisines.length} cuisines`)
  console.log(`seeded successfully`)

  // Need to capture lat/long.
  // Fix zip code?
  const bookings = await Promise.all([
    Booking.create({ title: "Dinner with a Great Guy", menu: "Peanut butter burritos", startDateTime: "1/31/2023, 6:00 p.m. EST", endDateTime: "1/31/2023, 9:00 p.m. EST", maxSeats: 10, openSeats: 3, address1: "123 Main St.", city: "Anytown", state: "MT", zipCode: 12345, chefId: 1, cuisineId: 1 }),
    Booking.create({ title: "Give a Guy a Fish", menu: "Fish tacos", startDateTime: "2/7/2023, 6:00 p.m. EST", endDateTime: "2/7/2023, 9:00 p.m. EST", maxSeats: 10, openSeats: 3, address1: "456 Oak Ave.", city: "Somewhere", state: "IL", zipCode: 12345, chefId: 1, cuisineId: 2 })
  ]);

  console.log(`seeded ${bookings.length} bookings`)
  console.log(`seeded successfully`)
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
