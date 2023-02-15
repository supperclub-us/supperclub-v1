import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchSingleMember,
  selectSingleMember,
} from "../slices/singleMemberSlice";
import CheckIcon from "@mui/icons-material/Check";
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
                    ? "#EB5757"
                    : "whitesmoke",
                color:
                  selectedMarker && selectedMarker.id === booking.id
                    ? "whitesmoke"
                    : "#1B202C",
                "&:hover": {
                  background: "#3b3f4f",
                },
              }}
            >
              <div className="map-booking-container-image">
                <img src={booking.imageUrl} alt={booking.title} />
              </div>
              <div>
                <p className="map-booking-container-location">
                  <small>
                    {booking.city}, {booking.state}
                  </small>
                </p>
              </div>
              <div>
                <p className="map-booking-container-title">
                  <small>{booking.title}</small>
                </p>
              </div>
              <div className="map-booking-container-date">
                <p>
                  <small>{booking.startDateTime}</small>
                </p>
                <p>
                  <small>{booking.endDateTime}</small>
                </p>
              </div>
              <div className="map-booking-container-price">
                <small>${booking.suggestedDonation} / guest</small>
              </div>
              <div>
                <p className="map-booking-container-host">
                  <small>
                    <img src={"./chef-hat2.png"} alt={"chef hat"} /> - Chef{" "}
                    {booking.chefBooking.firstName}{" "}
                    {booking.chefBooking.lastName}
                  </small>
                </p>
              </div>
              {currentMember && getMatches(memberBookings, booking) && (
                <div
                  className="map-booking-container-reserved"
                  style={{
                    color:
                      selectedMarker && selectedMarker.id === booking.id
                        ? "black"
                        : "#EB5757",
                  }}
                >
                  <small>
                    <p style={{ margin: "0" }}>Reserved</p>
                    <CheckIcon />
                  </small>
                </div>
              )}
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
