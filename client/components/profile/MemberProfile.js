import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchSingleMember,
  selectSingleMember,
} from "../slices/singleMemberSlice";
import { LinearProgress, Button, Skeleton, Box } from "@mui/material";
import { PageNotFound } from "../";
import { Card } from "./card/Card";
import dayjs from "dayjs";
import "./profile.css"

const MemberProfile = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const [pastEvents, setPastEvents] = useState(false)
  const [futureEvents, setFutureEvents] = useState(true)

  const { currentMember, isLoading } = useSelector(selectSingleMember);
  const memberBookings = currentMember?.memberBooking
  const now = dayjs();

  const futureMemberBookings = memberBookings?.filter((booking) => {

    const bookingDateTime = booking.startDateTime.split(' ');
    const bookingDate = bookingDateTime[0].split('/');
    const intBookingDate = bookingDate.map((element) => parseInt(element));
    return dayjs().isBefore(dayjs(`${intBookingDate[2]}-${intBookingDate[0]}-${intBookingDate[1]}`))
  });

  const pastMemberBookings = memberBookings?.filter((booking) => {

    const bookingDateTime = booking.startDateTime.split(' ');
    const bookingDate = bookingDateTime[0].split('/');
    const intBookingDate = bookingDate.map((element) => parseInt(element));
    return dayjs().isAfter(dayjs(`${intBookingDate[2]}-${intBookingDate[0]}-${intBookingDate[1]}`))
  })

  const handleClick = () => {
      setFutureEvents(!futureEvents);
  }

  useEffect(() => {
    dispatch(fetchSingleMember(user.id));
  }, []);

  if (isLoading || !currentMember) {
    return (
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Skeleton />
        <Skeleton animation="wave" />
        <Skeleton animation={false} />
      </Box>
    );
  }

  return (
    <div className="links">
      <h1>{`Welcome, ${currentMember.firstName}!`}</h1>
      <hr />
      <h1>Your {futureEvents ? 'Upcoming' : 'Previous'} Events </h1>
      <Button
        className="mbrprofile-events-button"
        variant="contained"
        size="small"
        onClick={handleClick}
        sx={{
          "&:hover": { backgroundColor: "#EB5757", color: "whitesmoke" },
          backgroundColor: "#EB5757",
          color: "whitesmoke",
          mb: 2.5,
        }}
      >
        View {futureEvents ? 'Previous': 'Upcoming'} Events
      </Button>
      <div className="profileContainer">
        {futureEvents ? futureMemberBookings && futureMemberBookings.length ? futureMemberBookings?.map((booking) => (
            <Card
              key={booking.id}
              booking={booking}
              currentMember={currentMember}
            />
          )) : "No bookings to show"
          :
          pastMemberBookings && pastMemberBookings.length ? pastMemberBookings.map((booking) => (
            <Card
              key={booking.id}
              booking={booking}
              currentMember={currentMember}
            />
          )) : "No previous bookings"
          }
      </div>
    </div>
  );
};

export default MemberProfile;
