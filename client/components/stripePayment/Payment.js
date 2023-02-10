import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useSelector } from "react-redux";
import CheckoutForm from "./CheckoutForm.js";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY);

const Payment = ({ reservedSeats, guests }) => {
  const [clientSecret, setClientSecret] = useState("");

  const booking = useSelector(state=>state.singleBooking.booking)

  console.log("PAYMENT COMPONENT --->", reservedSeats);
  console.log("PAYMENT COMPONENT --->", booking);
  console.log("LINE 17 PAYMENT --->", {
    ...booking,
    reservedSeats,
  });



  const seatsRemaining = booking?.openSeats - guests;
  const user = useSelector((state) => state.auth.me);



  useEffect(() => {
    console.log("RESERVED SEATS:", reservedSeats);
    console.log("BOOKING in PAYMENT -->", booking)

    async function getClientSecret() {
      console.log("RESERVED SEATS:", reservedSeats);

      const response = await axios.post("/payment", {...booking, reservedSeats});

      console.log("RESPONSE FROM AXIOS CALL", response);
      console.log("DATA FROM AXIOS CALL", response.data);

      let clientSecret =  await response.data.clientSecret;

      setClientSecret(clientSecret);
    }
    getClientSecret();
  }, []);

  const options = {
    clientSecret,
  };

  return (
    <div>
      <h1>TOTAL: ${booking?.suggestedDonation * reservedSeats}</h1>
      {user && user.id && (
        <div>
          {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          )}
        </div>
      )}
    </div>
  );
};

export default Payment;
