import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchSingleChef, selectSingleChef } from "../slices/singleChefSlice";
import { Link } from "react-router-dom";
import { Button, LinearProgress } from "@mui/material";
import { PageNotFound } from "../index";
import "./profile.css";
import { Card } from "./card/Card";

const ChefProfile = () => {
  const { id } = useParams();
  const user = useSelector((state) => state.auth.me);

  // the different states from the selectSingleChef State
  const { currentChef, isLoading, error } = useSelector(selectSingleChef);
  console.log("DAVID", currentChef)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSingleChef(id));
  }, [dispatch, id]);

  // error handling client side.
  if (error) {
    return <PageNotFound />;
  }

  if (isLoading) {
    return <LinearProgress />;
  }

  // if (!currentChef) {
  //   return <PageNotFound />;
  // }

  if (user.id !== Number(id)) {
    return <PageNotFound />;
  }

  return (
    <>
      <div className="links">
        <h1>
          Welcome
          {currentChef.role === "CHEF"
            ? ` Chef ${currentChef.firstName}`
            : currentChef.firstName}
        </h1>
        <h3> Your Dashboard</h3>
        <hr />
        <Button 
          variant="contained" 
          onClick={() => { window.location.href = `/chefs/${currentChef.id}/event` }}
          sx={{
            "&:hover": { backgroundColor: "#EB5757", color: "whitesmoke" },
            backgroundColor: "#EB5757",
            color: "whitesmoke",
          }}
        >
            Create Event
        </Button>
        <h3>YOUR EVENTS</h3>
        <div className="profileContainer">
          {currentChef && currentChef.chefBooking?.length
            ? currentChef.chefBooking.map((booking) => (<Card booking={booking} />))
            : "No Events"}
        </div>
      </div>
    </>
  );
};

export default ChefProfile;
