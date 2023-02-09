import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { matchRoutes, useNavigate } from "react-router-dom";
import {
  fetchChefsBookingsAsync,
  selectChefsBookings,
} from "../slices/chefsBookingsSlice";
import {
  fetchSingleMember,
  selectSingleMember,
} from "../slices/singleMemberSlice";
import "./map.css";

const SidebarList = ({ bounds, selectedMarker, filteredBookings, user }) => {
  const dispatch = useDispatch();
  const userId = user.id
  const bookings = useSelector(selectChefsBookings);
  console.log("SIDEBAR BOOKINGS", bookings)
  const { currentMember } = useSelector(selectSingleMember);
  console.log("SIDEBAR CURRENT MEMBER", currentMember)
  console.log("SIDEBAR FILTERED BOOKINGS", filteredBookings)

  useEffect(() => {
    dispatch(fetchSingleMember(userId));
    dispatch(fetchChefsBookingsAsync)
  }, []);

  const memberBookings = currentMember?.memberBooking
  console.log("MemberBookings", currentMember?.memberBooking)

  const getMatches = (a, b) => {
    let matches = []
  if (a && b) {
    for (let i = 0; i < a.length; i++) {
      for (let j = 0; j < b.length; j++) {
        if (b[j].id == a[i].id) {
          matches.push(a[i])
        }
      }
    }
  }
  return matches
  }

  let matches = getMatches(bookings, memberBookings);
  console.log("MATCHES", matches)

  const getMatchesAndBookingMatches = (matches, booking) => {
    for (let i = 0; i < matches.length; i++) {
      if (matches[i].id == booking.id) {
        return true
      }
    }
  }

  // let blargh = getMatchesAndBookingMatches(matches)

  // const bookingsOfMember = filteredBookings.filter((booking) => {
  //   return booking.memberBooking.some((member) => member.id == userId)
  // })
  // console.log("BOOKINGS OF MEMBER", bookingsOfMember)







  const navigate = useNavigate();


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


              {getMatchesAndBookingMatches(matches, booking) ? <p>MATCH</p> : '' }


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
