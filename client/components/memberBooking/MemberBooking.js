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
import {
  addMemberBookings,
  fetchSingleMember,
  selectSingleMember,
} from "../slices/singleMemberSlice";

const MemberBooking = ({user}) => {
  // const user = useSelector((state) => state.auth.me);

  console.log("--->", user, "<---");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { booking, error, isLoading } = useSelector(selectSingleChefBookings);

  const { bookingId } = useParams();

  const [guests, setGuests] = useState(1);

  console.log("booking ---<>>>", booking);

  const [loginSignUp, setLoginSignup] = useState(false);
  console.log("loginSignup ---->", loginSignUp);

  const { currentMember } = useSelector(selectSingleMember);
  console.log("current member, ", currentMember)

  useEffect(() => {
    dispatch(fetchSingleBookingAsync(bookingId))
    dispatch(fetchSingleMember(user.id))
  }, [dispatch]);

  const handleClick = (e) => {
    e.preventDefault();
    if (!user.id) {
      setLoginSignup(true);
    }
    if (user.id) {
      setLoginSignup(!loginSignUp);
      console.log("BOOKING ---><>",  {...booking}, "USER ID", user.id );
      dispatch(addMemberBookings({...booking, userId: user.id}));
      navigate("/");
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
    <div className="memberBooking-container">
      <div className="memberBooking-allInfo">
        <div className="memberBooking-images-title">
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
          <div className="memberBooking-title">
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
          </div>
        </div>
        <div className="memberBooking-experience">
          <div className="memberBooking-experience-shortDetails">
            <div className="memberBooking-experience-cuisine">
              Cuisine: {booking?.cuisine?.category}
            </div>
            <div className="memberBooking-experience-guests">
              {booking.openSeats} seats left
            </div>
            <div className="memberBooking-experience-guests">
              {booking.maxSeats} guests maximum
            </div>
            <div className="memberBooking-experience-time">
              <div className="memberBooking-experience-time-start">
                Start: {booking.startDateTime}
              </div>
              <div className="memberBooking-experience-time-end">
                End: {booking.endDateTime}
              </div>
            </div>
          </div>
          <div className="memberBooking-experience-menu">
            Menu: {booking.menu}
          </div>
        </div>
      </div>
      <Box className="memberBooking-form-container">
        <Box className="memberBooking-form" component="form">
          <FormControl fullWidth>
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
          <Box className="memberBooking-form-donation" fullwidth="true">
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
            Book
          </Button>
        </Box>
        <Box className="memberBooking-login-signup">
          {loginSignUp ? "PLEASE LOGIN OR SIGNUP TO BOOK EVENT" : null}{" "}
        </Box>
      </Box>
    </div>
  );
};

export default MemberBooking;
