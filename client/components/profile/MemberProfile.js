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
      <h3> Your Dashboard</h3>
      <hr />
      <h2>YOUR {futureEvents ? 'UPCOMING' : 'PREVIOUS'} SUPPERS </h2>
      <Button variant="contained" size="small" onClick={handleClick}> View {futureEvents ? 'Previous': 'Upcoming'} Suppers </Button>
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
