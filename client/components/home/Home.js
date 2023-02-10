import { Box } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";
import { Header } from "../index";
import "./Home.css";

/**
 * COMPONENT
 */
const Home = (props) => {
  const email = useSelector((state) => state.auth.me.email);


  console.log("PROCESS ENV IN HOME PAGE --->", process.env.RICHARD_COOKIE_KEY)
  console.log("PROCESS ENV IN HOME PAGE --->", process.env.STRIPE_PUBLISHABLE_KEY)

  return (
    <div>
      <Box
        className="about-image"
        sx={{
          backgroundImage: `url(https://i.imgur.com/1yADk1l.jpg)`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "100vh",
          width: "100%",
        }}
      >
        <h1 className="about-title"> blah blah blah 🚀 </h1>
        <Header />
      </Box>

    </div>
  );
};

export default Home;
