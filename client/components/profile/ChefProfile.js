import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchSingleChef, selectSingleChef } from "../slices/singleChefSlice";
import { Link } from "react-router-dom";
import { Button, Skeleton, Box } from "@mui/material";
import { PageNotFound } from "../index";
import "./profile.css";
import EditIcon from "@mui/icons-material/Edit";
import { Card } from "./card/Card";
import dayjs from "dayjs";
import AddIcon from '@mui/icons-material/Add';


const ChefProfile = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const user = useSelector((state) => state.auth.me);
  const [futureEvents, setFutureEvents] = useState(true)

  // the different states from the selectSingleChef State
  const { currentChef, isLoading, error } = useSelector(selectSingleChef);
  const chefBookings = currentChef?.chefBooking

  const futureChefBookings = chefBookings?.filter((booking) => {

    const bookingDateTime = booking.startDateTime.split(' ');
    const bookingDate = bookingDateTime[0].split('/');
    const intBookingDate = bookingDate.map((element) => parseInt(element));
    return dayjs().isBefore(dayjs(`${intBookingDate[2]}-${intBookingDate[0]}-${intBookingDate[1]}`))
  });

  const pastChefBookings = chefBookings?.filter((booking) => {

    const bookingDateTime = booking.startDateTime.split(' ');
    const bookingDate = bookingDateTime[0].split('/');
    const intBookingDate = bookingDate.map((element) => parseInt(element));
    return dayjs().isAfter(dayjs(`${intBookingDate[2]}-${intBookingDate[0]}-${intBookingDate[1]}`))
  })

  const handleClick = () => {
    setFutureEvents(!futureEvents);
}

  useEffect(() => {
    dispatch(fetchSingleChef(id));
  }, [dispatch, id]);

  // error handling client side.
  if (isLoading || !currentChef) {
    return (
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center", alignContent: "center" }}>
        <Skeleton />
        <Skeleton animation="wave" />
        <Skeleton animation={false} />
      </Box>
    );
  }

  if (user.id !== Number(id)) {
    return <PageNotFound />;
  }

  // if (error) {
  //   return <PageNotFound />;
  // }

  return (
    <>
      <div className="links">
        <h1>
          Welcome
          {currentChef.role === "CHEF"
            ? ` Chef ${currentChef.firstName}`
            : currentChef.firstName}
        </h1>
        <h3> Your Dashboard</h3>
        <hr />
        <Button
          variant="contained"
          onClick={() => {
            window.location.href = `/chefs/${currentChef.id}/event`;
          }}
          sx={{
            "&:hover": { backgroundColor: "#EB5757", color: "whitesmoke" },
            backgroundColor: "#EB5757",
            color: "whitesmoke",
          }}
          startIcon={<AddIcon />}

        >
          Create Event
        </Button>
        <h2>YOUR {futureEvents ? 'UPCOMING' : 'PREVIOUS'} EVENTS</h2>
        <Button variant="contained" size="small" onClick={handleClick}> View {futureEvents ? 'Previous': 'Upcoming'} Events </Button>
        <div className="profileContainer">
          {futureEvents ? futureChefBookings && futureChefBookings.length ?
          futureChefBookings.map((booking) => (
              <Card key={booking.id} booking={booking} />
            ))
            : "No Events"
          :
          pastChefBookings && pastChefBookings.length ?
          pastChefBookings.map((booking) => (
              <Card key={booking.id} booking={booking} />
            ))
            : "No Events"
          }
        </div>
      </div>
      {error && error.message}
    </>
  );
};

export default ChefProfile;
