import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useSelector } from "react-redux";
import CheckoutForm from "./CheckoutForm.js";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY);

const Payment = ({
  reservedSeats,
  guests,
  newBookingState,
  booking,
  userId,
  newAmountOfOpenSeats,
}) => {
  
  const [clientSecret, setClientSecret] = useState("");
  const user = useSelector((state) => state.auth.me);

  async function getClientSecret() {
    let { data } = await axios.post("/payment", newBookingState);
    let clientSecret = await data.clientSecret;
    setClientSecret(clientSecret);
  }

  useEffect(() => {
    getClientSecret();
  }, [newBookingState]);

  const options ={
    clientSecret,
  }

  return (
    <div>
      <h1>TOTAL: ${booking?.suggestedDonation * guests}</h1>
      {user && user.id && (
        <div>
          {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm
                booking={booking}
                userId={userId}
                newAmountOfOpenSeats={newAmountOfOpenSeats}
              />
            </Elements>
          )}
        </div>
      )}
    </div>
  );
};

export default Payment;
