import React, { useEffect } from "react";

import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchSingleBookingAsync,
  selectSingleBooking,
} from "../../slices/singleBookingSlice";
import "../profile.css"

export const Card = ({ booking }) => {
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.me);

  const handleClick = () => {
    navigate(`/bookings/${booking.id}`);
  };

  return (
    <div key={booking.id} className="cards">
      <h2>{booking.title}</h2>
      <img className="food-image" src={booking.imageUrl} />
      {user.role === "CHEF" && (
        <div>
          <p>
            {" "}
            Seats Reserved: {booking.maxSeats - booking.openSeats} /{" "}
            {booking.maxSeats}
          </p>

          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() => {
              navigate(`/users/chefs/${booking.chefId}/bookings/${booking.id}`);
            }}
            sx={{
              "&:hover": { backgroundColor: "#EB5757", color: "whitesmoke" },
              backgroundColor: "#EB5757",
              color: "whitesmoke",
            }}
          >
            Edit Event
          </Button>
        </div>
      )}

      {user.role === "MEMBER" && (
        <Button
          onClick={handleClick}
          variant="contained"
          sx={{
            "&:hover": { backgroundColor: "#EB5757", color: "whitesmoke" },
            backgroundColor: "#EB5757",
            color: "whitesmoke",
            mb: 4
          }}
        >
          View Details
        </Button>
      )}
    </div>
  );
};

export const ModalCard = ({ booking }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/bookings/${booking.id}`);
  };

  return (
    <div key={booking.id} className="modal-cards">
      <h5>{booking.title}</h5>
      <p style={{ padding: "10px" }}> Donation ${booking.suggestedDonation}</p>
      <div style={{padding: "3px"}}>
        <img
          className="modal-cards-image"
          src={booking.imageUrl}
          style={{
            height: "100%",
          }}
        />
      </div>

      <p>Date of Event: {booking.startDateTime} </p>
      <p style={{ padding: "10px" }}>
        End of Event Time: {booking.endDateTime}{" "}
      </p>
      <p style={{ padding: "10px" }}>{booking.openSeats} Seats Left </p>
      <Button
        onClick={handleClick}
        variant="contained"
        sx={{
          "&:hover": { backgroundColor: "#EB5757", color: "whitesmoke" },
          backgroundColor: "#EB5757",
          color: "whitesmoke",
        }}
      >
        View Details
      </Button>
    </div>
  );
};
