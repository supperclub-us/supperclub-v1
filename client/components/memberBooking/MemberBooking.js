import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  fetchSingleBookingAsync,
  selectSingleChefBookings,
} from "../slices/singleBookingSlice";
import {
  Box,
  Button,
  FormControl,
  ImageList,
  ImageListItem,
  InputAdornment,
  InputLabel,
  LinearProgress,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";

//css
import "./memberBooking.css";

const MemberBooking = () => {
  const user = useSelector((state) => state.auth.me);

  console.log("--->", user, "<---");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { booking, error, isLoading } = useSelector(selectSingleChefBookings);

  const { bookingId } = useParams();

  const [guests, setGuests] = useState(1);

  console.log("booking ---<>>>", booking);

  const [loginSignUp, setLoginSignup] = useState(false);
  console.log("loginSignup ---->", loginSignUp);

  useEffect(() => {
    dispatch(fetchSingleBookingAsync(bookingId));
  }, [dispatch]);

  const handleClick = (e) => {
    e.preventDefault();
    if (!user.id) {
      setLoginSignup(true);
    }
    if (user.id) {
      setLoginSignup(false);
      navigate("/checkout");
    }
  };

  const openSeatsArray = [];
  // openSeats
  for (let i = 1; i <= booking?.openSeats; i++) {
    openSeatsArray.push(i);
  }

  if (isLoading) {
    return <LinearProgress />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Box className="memberBooking-container">
      <Box className="memberBooking-allInfo">
        <Box className="memberBooking-images-title">
          <ImageList className="memberBooking-images">
            <ImageListItem>
              <img /> A BUNCH OF IMAGES GO HERE!!!
            </ImageListItem>
            <ImageListItem>
              <img /> A BUNCH OF IMAGES GO HERE!!!
            </ImageListItem>
            <ImageListItem>
              <img /> A BUNCH OF IMAGES GO HERE!!!
            </ImageListItem>
            <ImageListItem>
              <img /> A BUNCH OF IMAGES GO HERE!!!
            </ImageListItem>
          </ImageList>
          <Box className="memberBooking-title">
            <h1>{booking.title}</h1>
            <p>
              <small>
                Hosted by{" "}
                <Link to={`/chefs`} style={{ color: "red" }}>
                  {booking?.chefBooking?.firstName}{" "}
                </Link>
                in {booking?.city}
              </small>
            </p>
          </Box>
        </Box>
        <Box className="memberBooking-experience">
          <Box className="memberBooking-experience-shortDetails">
            <Box className="memberBooking-experience-cuisine">
              Cuisine: {booking?.cuisine?.category}
            </Box>
            <Box className="memberBooking-experience-guests">
              {booking.openSeats} seats left
            </Box>
            <Box className="memberBooking-experience-guests">
              {booking.maxSeats} guests maximum
            </Box>
            <Box className="memberBooking-experience-time">
              <Box className="memberBooking-experience-time-start">
                Start: {booking.startDateTime}
              </Box>
              <Box className="memberBooking-experience-time-end">
                End: {booking.endDateTime}
              </Box>
            </Box>
          </Box>
          <Box className="memberBooking-experience-menu">
            Menu: {booking.menu}
          </Box>
        </Box>
      </Box>
      <Box className="memberBooking-form">
        <Box className="memberBooking-form" component="form">
          <FormControl>
            <InputLabel id="guests">Guests</InputLabel>
            <Select
              value={guests}
              label="guests"
              onChange={(e) => {
                console.log(e.target.value), setGuests(e.target.value);
              }}
            >
              {openSeatsArray?.map((guest) => (
                <MenuItem key={guest} value={guest}>
                  {guest} {guest === 1 ? "guest" : "guests"}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box className="memberBooking-form-donation">
            <Box
              id="outlined-adornment-amount"
              label="Donation Amount"
              defaultValue={`${booking?.suggestedDonation}`}
            >
              {" "}
              {`$${booking?.suggestedDonation}`}
            </Box>
          </Box>
          <Button variant="contained" onClick={handleClick}>
            {" "}
            Book{" "}
          </Button>
        </Box>
        <Box className="memberBooking-login-signup">
          {loginSignUp ? "PLEASE LOGIN OR SIGNUP TO BOOK EVENT" : null}{" "}
        </Box>
      </Box>
    </Box>
  );
};

export default MemberBooking;
