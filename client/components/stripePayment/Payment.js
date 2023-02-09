import React, { useEffect, useState } from "react";
import { STRIPE_PUBLISHABLE_KEY } from "../../env";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useSelector } from "react-redux";
import CheckoutForm from "./CheckoutForm"

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

const Payment = () => {

  const [clientSecret, setClientSecret] = useState("");
  const user = useSelector((state) => state.auth.me);

  const booking = 
    {
      id: 2,
      title: "Great East Asian Cuisine!",
      menu: "A nice blend of xyz",
      imageUrl: "https://i.postimg.cc/JhZjnSQ9/asian.jpg",
      suggestedDonation: 60,
      startDateTime: "03/01/2023 5:30PM",
      endDateTime: "03/01/2023 7:30PM",
      maxSeats: 5,
      openSeats: 3,
      address1: "41 West 85th Street",
      address2: "",
      city: "New York",
      state: "NY",
      zipCode: "10024",
      latitude: 40.78534,
      longitude: -73.9711,
      chefId: 8,
      cuisineId: 5,
    }
    
  useEffect(() => {
    async function getClientSecret() {
      const { data } = await axios.post("/payment", booking);
      console.log("DATA FROM AXIOS CALL", data)
      let clientSecret = data.clientSecret;
      setClientSecret(clientSecret);
    }
    getClientSecret();
  }, []);

  const options = {
    clientSecret,
  };

  return (
    <div>
      <h1>PAYMENT</h1>
      {user && user.id && (
        <div>
          {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          )}
        </div>
      )}
      <h2>TOTAL: </h2>
    </div>
  );
};

export default Payment;
