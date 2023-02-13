import { Box } from "@mui/system";
import React from "react";
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
      >
        <div className="home-title-and-header-container">
          <h1 className="about-title"> Discover dinner events hosted by chefs</h1>
          <Header />
        </div>

      </Box>

    </div>
  );
};

export default Home;
