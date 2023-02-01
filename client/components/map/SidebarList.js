import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchChefsBookingsAsync,
  selectChefsBookings,
} from "../slices/chefsBookingsSlice";
import "./map.css";

const SidebarList = ({ bounds }) => {

  const navigate = useNavigate();
  const bookings = useSelector(selectChefsBookings);

  const filteredBookings = bookings.filter((booking) => {
    return (
      booking.latitude >= bounds.latitude[0] &&
      booking.latitude <= bounds.latitude[1] &&
      booking.longitude >= bounds.longitude[0] &&
      booking.longitude <= bounds.longitude[1]
    );
  });
  console.log("BOOKINGS --->", bookings);
  console.log("filteredBookings", filteredBookings)

  useEffect(() => {
    // dispatch(fetchChefsBookingsAsync());
  }, []);

  const handleClick = (bookingId) => {
    navigate(`/bookings/${bookingId}`)
  }

  return (
    <div className="map-sidebar-container">
      {filteredBookings && filteredBookings.length ? (
        filteredBookings.map((booking) => {
          return (
            <div key={booking.id} className="map-booking-container" onClick={() => handleClick(booking.id)}>
              <p>{booking.title}</p>
              {/* <p>{booking.menu}</p>
                  <p>
                    Open Seats: {booking.openSeats}/{booking.maxSeats}
                  </p> */}
              <p>
                Host: Chef {booking.chefBooking.firstName}{" "}
                {booking.chefBooking.lastName}
              </p>
            </div>
          );
        })
      ) : (
        <h1>No Bookings</h1>
      )}
    </div>
  );
};

export default SidebarList;
