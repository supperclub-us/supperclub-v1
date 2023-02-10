import React, { useEffect, useState } from 'react'
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'
import { useSelector } from 'react-redux'
import LockIcon from '@mui/icons-material/Lock';

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
        <form id="payment-form" onSubmit={handleSubmit}>
          <PaymentElement id="payment-element" />
          <button
          variant="contained"
            disabled={isLoading || !stripe || !elements}
            id="submit"
          >
            <span id="button-text">
              {isLoading ? (
                <span></span>
              ) : (
                <div >
                  <span> Book Event </span>
                  <LockIcon width={20} height={20} />
                </div>
              )}
            </span>
          </button>

          {/* Show any error or success messages */}
          {message && (
            <div id="payment-message">
              {message}
            </div>
          )}
        </form>
      );
    };

export default CheckoutForm