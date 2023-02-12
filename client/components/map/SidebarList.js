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
  const userId = user.id;

  const { currentMember } = useSelector(selectSingleMember);
  const memberBookings = currentMember?.memberBooking;

  useEffect(() => {
    if (userId) dispatch(fetchSingleMember(userId));
  }, [userId]);

  const getMatches = (memberBookings, booking) => {
    if (memberBookings) {
      for (let singleMemberBooking of memberBookings) {
        if (singleMemberBooking.id == booking.id) {
          return true;
        }
      }
    }
  };

  const handleClick = (bookingId) => {
    navigate(`/bookings/${bookingId}`);
  };

  return (
    <div className="map-sidebar-container">
      {filteredBookings && filteredBookings.length ? (
        filteredBookings.map((booking) => {
          return (
            <div
              key={booking.id}
              className="map-booking-container"
              onClick={() => handleClick(booking.id)}
              style={{
                background:
                  selectedMarker && selectedMarker.id === booking.id
                    ? "green"
                    : "#252b3d",
                ":hover": {
                  background: "#3b3f4f",
                },
              }}
            >
              <p>{booking.title}</p>
              {currentMember && getMatches(memberBookings, booking) ? (
                <p>YOU HAVE BOOKED THIS EVENT</p>
              ) : (
                ""
              )}
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
