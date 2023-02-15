import React, { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import LockIcon from "@mui/icons-material/Lock";
import { Button } from "@mui/material";


const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const user = useSelector((state) => state.auth.me);
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) return;

    // const clientSecret = elements._commonOptions.clientSecret.clientSecret;
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );
    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;
    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `http://localhost:8080/confirmation`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsLoading(false);
  };

  return (
    <form
      id="payment-form"
      onSubmit={handleSubmit}
      style={{
        width: "400px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <PaymentElement id="payment-element" />
      <button
        variant="contained"
        disabled={isLoading || !stripe || !elements}
        id="submit"
        style={{
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "1em",
          backgroundColor: "#eb5757",
          color: "whitesmoke",
          padding: "4px",
          fontFamily: '"Roboto","Helvetica","Arial","sans-serif"',
          fontWeight: "500",
          fontSize: "0.875rem",
          lineHeight: "1.75",
          letterSpacing: "0.02857em",
          textTransform: "uppercase",
          minWidth: "64px",
          padding: "6px 16px",
          borderRadius: "4px",
          border: "none",
          cursor: "pointer",
          transition: "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
          boxShadow: "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",


        }}
      >
        <span id="button-text">
          {isLoading ? (
            <span></span>
          ) : (
            <div>
              <span> Book Event </span>
              <LockIcon width={20} height={20} />
            </div>
          )}
        </span>
      </button>

      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
};

export default CheckoutForm;
