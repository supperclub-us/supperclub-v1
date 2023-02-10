import { Box } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";
import { Header } from "../index";
import "./home.css";

/**
 * COMPONENT
 */
const Home = (props) => {
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
