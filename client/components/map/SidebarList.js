import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchChefsBookingsAsync,
  selectChefsBookings,
} from "../slices/chefsBookingsSlice";
import "./map.css";

const SidebarList = () => {
  // const bookings = useSelector((state) => state.chefsBookings);

  const dispatch = useDispatch;
  const bookings = useSelector(selectChefsBookings);

  console.log("BOOKINGS --->", bookings);

  useEffect(() => {
    // dispatch(fetchChefsBookingsAsync());
  }, []);

  return (
    <div className="map-sidebar-container">
      <p>Sidebar hello</p>
      {bookings && bookings.length ?
      bookings.map((booking) => {
        return (
          <div key={booking.id} className="map-booking-container">
            <p>{booking.title}</p>
            <p>{booking.menu}</p>
            <p>Open Seats: {booking.openSeats}/{booking.maxSeats}</p>
            <p>Host: Chef {booking.chefBooking.firstName} {booking.chefBooking.lastName}</p>
          </div>
        )
      })
  : <h1>No Bookings</h1>
    }
    </div>
  );
};

export default SidebarList;
