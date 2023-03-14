import React from "react";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import {
  FaCcAmex,
  FaCcDiscover,
  FaCcMastercard,
  FaCcStripe,
  FaCcVisa,
  FaPaypal,
} from "react-icons/fa";
import { Typography } from "@mui/material";
import "./footer.css";

function Footer() {

  const footerRowStyle = {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "flex-start",
  };
  const footerColumnStyle = {
    display: "flex",
    flexDirection: "column",
    gap: 1,
    padding: "20px",
  };

  const paymentIconContainerStyle = {
    display: "flex",
    gap: "10px",
    justifyContent: "space-between",
    fontSize: "24px",
  };
  return (
    <footer className="footer-container">
      <div
        className="footer-row"
        style={{
          ...footerRowStyle,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          className="footer-column"
          style={{ ...footerColumnStyle, flex: 1 }}
        >
          <p>Where To Find Us </p>
          <Typography variant="body1">198 10th Avenue</Typography>
          <Typography variant="body1">New York, NY, USA</Typography>
          <Typography variant="body1">Tel: 718-123-4567</Typography>
        </div>

        <div
          className="footer-column"
          style={{ ...footerColumnStyle, flex: 1 }}
        >
          <Typography variant="body1"> Contact Us </Typography>
          <Typography variant="body1"> About Us </Typography>
          <Typography variant="body1"> FAQ </Typography>
          <Typography variant="body1"> Terms of Service </Typography>
          <Typography variant="body1"> Status </Typography>
        </div>

        <div
          className="socials-container"
          style={{ ...footerColumnStyle, flex: 1, textAlign: "center" }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <p>Follow us!</p>

            <Twitter fontSize="medium" />
            <Instagram fontSize="medium" />
            <Facebook fontSize="medium" />
          </div>
        </div>
      </div>

      <div
        className="footer-row"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",

          alignItems: "center",
        }}
      >
        {/* <div className="payment-icons" style={paymentIconContainerStyle}>
          <FaPaypal />
          <FaCcVisa />
          <FaCcDiscover />
          <FaCcAmex />
          <FaCcMastercard />
          <FaCcStripe />
        </div> */}
        {/* <p>2023 Supper Club</p> */}
      </div>
    </footer>
  );
}

export default Footer;
