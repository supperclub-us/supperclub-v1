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

  console.log("NEW BOOKING STATE!!!! OUTSIDE USEEFFECT - DONATION?", newBookingState?.suggestedDonation);

  const user = useSelector((state) => state.auth.me);

  useEffect(() => {
    console.log("NEW BOOKING STATE IN PAYMENT: ", newBookingState);

    async function getClientSecret() {
      console.log("RESERVED SEATS:", reservedSeats);

      const response = await axios.post("/payment", newBookingState);

      console.log("RESPONSE FROM AXIOS CALL", response);
      console.log("DATA FROM AXIOS CALL", response.data);

      let clientSecret = await response.data.clientSecret;

      setClientSecret(clientSecret);
    }
    getClientSecret();
  }, [guests]);

  const options = {
    clientSecret,
  };
  
  console.log("Reserved Seats and Booking Donation:", {guests, suggestedDonation: booking?.suggestedDonation})
  console.log("TOTAL: ", parseInt(booking?.suggestedDonation * guests))

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
