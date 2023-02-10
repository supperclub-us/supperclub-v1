require('dotenv').config();
const express = require("express");
const app = express.Router()
module.exports = app
const stripe = require("stripe")(process.env.STRIPE_SECRET_API_KEY)

// POST /payment
app.post("/payment", async (req, res) => {
    try {

      const { suggestedDonation, guests} = req.body

      // Create a PaymentIntent with the order amount and currency
      let paymentIntent = await stripe.paymentIntents.create({
        amount: suggestedDonation * guests * 100,
        currency: "usd",
        automatic_payment_methods: {
          enabled: true,
        },
      });

      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (err) {
      console.log(err);
    }
  });
