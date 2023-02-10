require('dotenv').config();
const express = require("express");
const app = express.Router()
module.exports = app
const stripe = require("stripe")(process.env.STRIPE_SECRET_API_KEY)

// POST /payment
app.post("/payment", async (req, res) => {
    try {
        console.log("REQ BODY IN STRIPE.JS BACKEND LINE 11 NEW BOOKING STATE ---->", req.body);

        const { suggestedDonation, guests } = req.body

      // Create a PaymentIntent with the order amount and currency
      let paymentIntent = await stripe.paymentIntents.create({
        amount: suggestedDonation * guests * 100,
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