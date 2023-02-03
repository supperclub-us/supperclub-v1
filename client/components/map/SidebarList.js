import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchChefsBookingsAsync,
  selectChefsBookings,
} from "../slices/chefsBookingsSlice";
import "./map.css";

const SidebarList = ({ bounds, selectedMarker, filteredBookings }) => {

  const navigate = useNavigate();
  const bookings = useSelector(selectChefsBookings);

  // const reduxStartDate = useSelector((state) => state.startEndDate.startDate);
  // const reduxEndDate = useSelector((state) => state.startEndDate.endDate)

  // const filteredBookings = bookings.filter((booking) => {
  //   const bookingDateTime = booking.startDateTime.split(' ');
  //   const bookingDate = bookingDateTime[0].split('/')
  //   // console.log("BOOKING DATE", bookingDate)
  //   const intBookingDate = bookingDate.map((element) => parseInt(element))
  //   // console.log(" INTBOOKING DATE", intBookingDate)
  //   console.log("FILTERED BOOKINGS",)

  //   return (
  //     booking.latitude >= bounds.latitude[0] &&
  //     booking.latitude <= bounds.latitude[1] &&
  //     booking.longitude >= bounds.longitude[0] &&
  //     booking.longitude <= bounds.longitude[1] &&

  //     // year
  //     reduxStartDate[2] == intBookingDate[2] &&
  //     // edgeCase:booking near the end of the year

  //     // month
  //     reduxStartDate[0] <= intBookingDate[0] &&
  //     reduxEndDate[0] >= intBookingDate[0] &&
  //     // day
  //     reduxStartDate[1] <= intBookingDate[1] &&
  //     reduxEndDate[1] >= intBookingDate[1]

  //   );
  // });

  // useEffect(() => {
  //   // dispatch(fetchChefsBookingsAsync());
  // }, []);

  const handleClick = (bookingId) => {
    navigate(`/bookings/${bookingId}`)
  }

  return (
    <div className="map-sidebar-container">
      {filteredBookings && filteredBookings.length ? (
        filteredBookings.map((booking) => {
          return (
            <div key={booking.id} className="map-booking-container" onClick={() => handleClick(booking.id)} style={selectedMarker && selectedMarker.id === booking.id ? { background: "green" } : { background: "#f2f2f2" }}>
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
