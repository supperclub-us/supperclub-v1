import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  fetchSingleBookingAsync,
  selectSingleChefBookings,
} from "../slices/singleBookingSlice";
import { LinearProgress } from "@mui/material";

const MemberBooking = () => {
  const dispatch = useDispatch();
  const { booking, error, isLoading } = useSelector(selectSingleChefBookings);
  console.log("BOOKING FOR MEMBER", booking);
  const { bookingId } = useParams();

  useEffect(() => {
    dispatch(fetchSingleBookingAsync(bookingId));
  }, []);

  if (isLoading) {
    return <LinearProgress />;
  }

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div>
      <div className="memberBooking-title-images">
        <div className="memberBooking-title">
          <h1>{booking.title}</h1>
          <p>
            <small>Hosted by <Link to={`/users/chefs/${booking.chefId}`} style={{color: "red"}}>{booking?.chefBooking?.firstName}</Link></small>
          </p>
        </div>
        <div className="memberBooking-images">{}</div>
      </div>
    </div>
  );
};

export default MemberBooking;
