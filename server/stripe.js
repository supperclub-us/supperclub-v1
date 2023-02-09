require("dotenv").config();

const express = require("express")
const app = express.Router();

const stripe = require("stripe")("sk_test_51MZc8ALQEcvgxJTiZfQTrBsn2EkPoPPpdbE3pXDwDuyTmUtpB4a6PNKKZvRitk8oKcmLHENTyS1Nd2gisfWGSC8i004hLgKvjW");

// console.log("process.env -----> ", process.env.REACT_APP_STRIPE_SECRET_API_KEY)

module.exports = app;


/* const calculateAmount = (booking) => {
  // Replace this constant with a calculation of the bookings/seats amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 10000;
}; */

// POST /api/stripe/payment
app.post("/payment", async (req, res) => {
  try {
    const { suggestedDonation } = req.body;
    console.log("suggestedDonation", suggestedDonation)

    console.log("REQ BODY STRIPE: ", req.body);
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: suggestedDonation * 100,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });
    console.log("paymentIntent", paymentIntent)
    console.log("paymentIntent secret", paymentIntent.client_secret)

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    console.log(err);
  }
});
