import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllChefsAsync, selectAllChefs } from "../slices/allChefsSlice";
import "./chefForm.css";

const Chefs = () => {
  const dispatch = useDispatch();
  const chefs = useSelector(selectAllChefs);

  useEffect(() => {
    dispatch(fetchAllChefsAsync());
  }, [dispatch]);

  console.log("CHEFS-->", chefs);

  return (
    <div className="chefs-page-container">

      <h1>Chefs</h1>
      👩‍🍳 👨‍🍳
      <div className="chefs-allCards-container">
        {chefs && chefs.length ? (
          chefs.map((chef) => {
            return (
              // Box
              <div key={chef.id} className="chefs-card-container">
                {/* Title for name */}
                <h3>Chef {chef.firstName} {chef.lastName}</h3>
                <p>{chef.bio}</p>
                <div className="chefs-card-bookingcards-container">

                  {chef.chefBooking && chef.chefBooking.length ? chef.chefBooking.map((booking) =>  {
                    return (
                      // Button
                      <Button
                      className="chefs-card-bookingcard"
                      variant="outlined"
                      size="small">
                        <p>{booking.title}</p>
                      </Button>
                    )
                  }) : <p>No Hostings</p>}

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
