import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchSingleMember,
  selectSingleMember,
} from "../slices/singleMemberSlice";
import "./map.css";

const SidebarList = ({ bounds, selectedMarker, filteredBookings, user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = user.id

  const { currentMember } = useSelector(selectSingleMember);
  const memberBookings = currentMember?.memberBooking

  useEffect(() => {
    dispatch(fetchSingleMember(userId));
  }, []);

  const getMatches = (memberBookings, booking) => {
    for (let singleMemberBooking of memberBookings) {
      if (singleMemberBooking.id == booking.id) {
        return true
      }
    }
  }

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
              {getMatches(memberBookings, booking) ? <p>YOU HAVE BOOKED THIS EVENT</p> : ''}
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
