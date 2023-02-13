import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/store";
import App from "./components/app/App";
import { BrowserRouter as Router } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

const root = createRoot(document.getElementById("app"));

const withStripe = (Component) => {
  return (props) => {
    const [stripe, setStripe] = React.useState(null);

    React.useEffect(() => {
      loadStripe(process.env.STRIPE_PUBLISHABLE_KEY)
        .then((stripeInstance) => {
          setStripe(stripeInstance);
        });
    }, []);

    return stripe ? <Component {...props} stripe={stripe} /> : null;
  };
};

const WrappedApp = withStripe(App);

root.render(
  <Router>
    <Provider store={store}>
      <React.StrictMode>
        <WrappedApp />
      </React.StrictMode>
    </Provider>
  </Router>
);
