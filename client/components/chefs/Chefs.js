import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAllChefsAsync, selectAllChefs } from "../slices/allChefsSlice";
import "./chefForm.css";

const Chefs = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const chefs = useSelector(selectAllChefs);

  useEffect(() => {
    dispatch(fetchAllChefsAsync());
  }, [dispatch]);

  console.log("CHEFS-->", chefs);

  const handleClick = (bookingId) => {
    console.log("chefs booking clicked!!!")
    navigate(`/bookings/${bookingId}`)
  }

  return (
    <div className="chefs-page-container">
      <header className="chefs-page-banner">
        <h1>Check Out Who's Cooking!</h1>
        <p>Chefs who want to share their passion with you!</p>
      </header>
      <div className="chefs-allCards-container">
        {chefs && chefs.length ? (
          chefs.map((chef) => {
            return (
              // Box
              <div key={chef.id} className="chefs-card-container">
                <h3>Chef {chef.firstName} {chef.lastName}</h3>
                <p>{chef.bio}</p>
                <p1>Current Hostings:</p1>

                <div className="chefs-card-bookingcards-container">

                  {chef.chefBooking && chef.chefBooking.length ? chef.chefBooking.map((booking) =>  {
                    return (
                      // Button
                      <Button
                      className="chefs-card-bookingcard"
                      variant="outlined"
                      size="small"
                      key={booking.id}
                      onClick={() => handleClick(booking.id)}
                      sx={{
                        display: "flex",
                        alignContent: "flex-start",
                        margin: "0em 0em 0em 0.5em",
                        minWidth: "10em",
                        height: "5em",
                        overflow: "clip",
                        padding: "1em"
                      }}>
                        <p>{booking.title}</p>
                      </Button>
                    )
                  }) : <p>No Hostings Yet...</p>}
                </div>

              </div>
            );
          })
        ) : (
          <h1>No Chefs Around...</h1>
        )}
      </div>
    </div>
  );
};

export default Chefs;
