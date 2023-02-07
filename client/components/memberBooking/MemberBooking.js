import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  fetchSingleBookingAsync,
  selectSingleBooking,
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
  fetchSingleMember,
  selectSingleMember,
} from "../slices/singleMemberSlice";
import { addMemberBookings } from "../slices/singleBookingSlice";

const MemberBooking = ({ user }) => {
  console.log("----USER--->", user, "<---USE----");

  const { bookingId } = useParams();
  const { id } = user;
  const userId = id;
  const [guests, setGuests] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("booking id and user id", { bookingId, userId });
    dispatch(fetchSingleBookingAsync(bookingId));
    dispatch(fetchSingleMember(userId));
  }, [dispatch, user, bookingId]);

  const { booking, error, isLoading } = useSelector(selectSingleBooking);
  console.log("booking ---<>>>", booking);

  const [loginSignUp, setLoginSignup] = useState(false);
  console.log("loginSignup ---->", loginSignUp);

  const { currentMember } = useSelector(selectSingleMember);
  console.log("current member, ", currentMember);

  const handleClick = (e) => {
    e.preventDefault();
    if (!userId) {
      setLoginSignup(true);
    }
    if (userId || currentMember) {
      // find guest amount selected:
      const reservedSeats = guests;
      const bookingAmtOfGuests = booking.openSeats;
      const newAmountOfOpenSeats = bookingAmtOfGuests - reservedSeats;
      console.log({ reservedSeats, bookingAmtOfGuests, newAmountOfOpenSeats });
      setLoginSignup(false);
      console.log("BOOKING ---><>", { ...booking }, "USER ID", userId);
      dispatch(addMemberBookings({ ...booking, userId, newAmountOfOpenSeats, reservedSeats }));
      navigate("/");
    }
  };

  const memberBookings = currentMember?.memberBooking
  console.log("MEMBER BOOKINGS >>>>", memberBookings)
  const memberBooking = memberBookings?.find(booking => booking.id == bookingId)
  console.log("MEMBER BOOKING >>>>>>>>>", memberBooking)
  const reservedSeats = memberBooking?.users_bookings.reservedSeats
  console.log("RESERVED SEATS>>>>", reservedSeats)

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
        <div className="reservedSeats">
          {currentMember && `You have reserved ${reservedSeats || 'no' } seats for this booking`}
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
          {booking?.openSeats <= 0 ? (
            <Button
              variant="contained"
              sx={{
                "&:hover": { backgroundColor: "#EB5757", color: "whitesmoke" },
                backgroundColor: "#EB5757",
                color: "whitesmoke",
              }}
            >
              {" "}
              Sold Out{" "}
            </Button>
          ) : (
            <Button variant="contained" onClick={handleClick}>
              Book
            </Button>
          )}
        </Box>
        <Box className="memberBooking-login-signup">
          {loginSignUp ? "PLEASE LOGIN OR SIGNUP TO BOOK EVENT" : null}{" "}
        </Box>
      </Box>
    </div>
  );
};

export default MemberBooking;
