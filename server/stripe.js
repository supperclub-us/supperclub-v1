require('dotenv').config();
const express = require("express");
const app = express.Router()
module.exports = app
const stripe = require("stripe")(process.env.STRIPE_SECRET_API_KEY)

console.log("PROCESS DOT ENV IN STRIPE BACKEND, ", process.env)

// POST /payment
app.post("/payment", async (req, res) => {
    try {
        console.log("REQ BODY IN STRIPE LINE 11 ---->", req.body);


      // Create a PaymentIntent with the order amount and currency
      const paymentIntent = await stripe.paymentIntents.create({
        amount: 100 * 100,
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