import React from "react";
import { useSelector } from "react-redux";
import { Header } from "../index";
import { About } from "../index"

/**
 * COMPONENT
 */
const Home = (props) => {
  const email = useSelector((state) => state.auth.me.email);


  console.log("PROCESS ENV IN HOME PAGE --->", process.env.RICHARD_COOKIE_KEY)
  console.log("PROCESS ENV IN HOME PAGE --->", process.env.STRIPE_PUBLISHABLE_KEY)

  return (
    <div>
      <Header />
      <About />
    </div>
  );
};

export default Home;
