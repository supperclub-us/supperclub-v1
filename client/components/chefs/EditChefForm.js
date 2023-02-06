import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, useParams } from "react-router-dom";
import {
  addSingleChefBooking,
  editSingleChefBooking,
  fetchSingleChefBooking,
  selectSingleChefBookings,
} from "../slices/singleChefBookingsSlice";
import { fetchSingleChef, selectSingleChef } from "../slices/singleChefSlice";
import { Home } from "../index";
import MapBoxAccessToken from "../../env";
import axios from "axios";
import "./chefForm.css";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Link,
  OutlinedInput,
  InputAdornment,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

const states = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "AS",
  "CA",
  "CO",
  "CT",
  "DE",
  "DC",
  "FL",
  "GA",
  "GU - Guam",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "CM",
  "OH",
  "OK",
  "OR",
  "PA",
  "PR",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "TT - Trust Territory",
  "UT",
  "VT",
  "VA",
  "VI",
  "WA",
  "WV",
  "WI",
  "WY",
];

const EditChefForm = () => {
  const userId = useSelector((state) => state.auth.me.id);
  // console.log("userId--->", userId);

  const dispatch = useDispatch();
  
  const { chefId, bookingsId } = useParams();
  console.log("CHEF from EditChefForm.js -----------> ", chefId);
  console.log("BOOKINGS from EditChefForm.js -----------> ", bookingsId);

  const chefBookings = useSelector(selectSingleChefBookings);
  console.log("chefBooking--->", chefBookings)

  // filter on chefBookings to get the single booking
  // const singleBooking = chefBookings.find((booking) => booking.id === Number(bookingsId));
  // console.log("singleBooking--->", singleBooking);

  // useSelector(selectSingleChef);

  const [title, setTitle] = useState('');
  console.log("title--->", title);

  const [menu, setMenu] = useState("");
  console.log("menu--->", menu);

  const [cuisineId, setCuisineId] = useState("");
  console.log("cuisineId--->", cuisineId);

  const [suggestedDonation, setSuggestedDonation] = useState("");
  console.log("suggestedDonation--->", suggestedDonation);

  const [startValue, setStartValue] = useState(dayjs());
  // console.log("startValue--->", startValue.format("MM/DD/YYYY h:mmA"));

  const [endValue, setEndValue] = useState(dayjs());
  // console.log("endValue--->", endValue.format("MM/DD/YYYY h:mmA"));

  const [max, setMax] = useState("");
  console.log("max--->", max);

  const [openSeats, setOpenSeats] = useState("");
  console.log("openSeats--->", openSeats);

  const [address1, setAddress1] = useState("");
  console.log("address1--->", address1);

  const [address2, setAddress2] = useState("");
  console.log("address2--->", address2);

  const [city, setCity] = useState("");
  console.log("city--->", city);

  const [state, setState] = useState("");
  console.log("state--->", state);

  const [zip, setZip] = useState("");
  console.log("zip--->", zip);

  useEffect(() => {
    dispatch(fetchSingleChef(userId));
    dispatch(fetchSingleChefBooking(userId));
  }, []);

  const singleBooking = chefBookings.find((booking) => booking.id === Number(bookingsId));
  console.log("singleBooking--->", singleBooking);
  
  useEffect(() => {
    console.log("<<< ChefBookings CHANGED >>>")



    if(singleBooking) {
      console.log("singleBooking.title--->", singleBooking.title);
      console.log("singleBooking.cuisineId--->", singleBooking.cuisineId);
      console.log("singleBooking.suggestedDonation--->", singleBooking.suggestedDonation);
      console.log("singleBooking.menu--->", singleBooking.menu);
      console.log("singleBooking.startDateTime--->", singleBooking.startDateTime);
      console.log("singleBooking.endDateTime--->", singleBooking.endDateTime);
      console.log("singleBooking.max--->", singleBooking.maxSeats);
      console.log("singleBooking.openSeats--->", singleBooking.openSeats);
      console.log("singleBooking.address1--->", singleBooking.address1);
      console.log("singleBooking.address2--->", singleBooking.address2);
      console.log("singleBooking.city--->", singleBooking.city);
      console.log("singleBooking.state--->", singleBooking.state);
      console.log("singleBooking.zip--->", singleBooking.zipCode);
      
      setTitle(singleBooking.title);
      setCuisineId(singleBooking.cuisineId);
      setSuggestedDonation(singleBooking.suggestedDonation || "")
      setMenu(singleBooking.menu);
      setStartValue(dayjs(`${singleBooking.startDateTime}`, "MM/DD/YYYY h:mmA"))
      setEndValue(dayjs(`${singleBooking.endDateTime}`, "MM/DD/YYYY h:mmA"))
      setMax(singleBooking.maxSeats);
      setOpenSeats(singleBooking.openSeats);
      setAddress1(singleBooking.address1);
      setAddress2(singleBooking.address2 || "");
      setCity(singleBooking.city);
      setState(singleBooking.state);
      setZip(singleBooking.zipCode);
    } 
    
  }, [chefBookings]);

  // handle submit for chef form
  const handleSubmit = async (e) => {
    console.log("handleSubmit clicked!");
    // e.preventDefault();
    try {
      // grabbing full address from the useState
      const address = `${address1}, ${city}, ${state}, ${zip}`;

      // axios call to the MapBox GeoCode API to get the lat/long values
      const { data } = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${MapBoxAccessToken}`
      );
      const location = data.features[0].center;

      // conditional to CHECK AND SEE if there is a location prior to dispatching the POST to the store and backend
      if (location) {
        dispatch(
          // will need to check on this CHEF ID and auth because as of right now anyone who<TextFields an id into the url that is a chef
          // is allowed to<TextField data for THAT chef that isn't them. Will need to make it so it is only the userId who is logged in at the moment!
          editSingleChefBooking({
            id: userId,
            title,
            cuisineId,
            menu,
            suggestedDonation,
            startValue: startValue.format("MM/DD/YYYY h:mmA"),
            endValue: endValue.format("MM/DD/YYYY h:mmA"),
            max,
            openSeats,
            address1,
            address2,
            city,
            state,
            zip,
            latitude: location[1], // the location variable sends back an array of [long, lat]
            longitude: location[0], // the location variable sends back an array of [long, lat]
          })
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {userId !== parseInt(chefId) ? (
        <Home />
      ) : (
        <>
          <div className="chefEvent-container">
            <Typography variant="h5">Edit Your Supper Club Event!</Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              className="chefEvent-form"
            >
              <div className="chefForm-title-of-event">
                <TextField
                  label="Title of Event"
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  value={title}
                  fullWidth
                />
              </div>
              <div className="cuisineCategory-and-donation">
                <div className="chefEvent-cuisineCategory">
                  <FormControl>
                    <InputLabel id="demo-simple-select-label">Cuisine</InputLabel>
                    <Select
                      onChange={(e) => setCuisineId(Number(e.target.value))}
                      value={cuisineId}
                      label="cuisine"
                    >
                      <MenuItem value="1">Chinese</MenuItem>
                      <MenuItem value="2">Japanese</MenuItem>
                      <MenuItem value="3">Indian</MenuItem>
                      <MenuItem value="4">French</MenuItem>
                      <MenuItem value="5">Thai</MenuItem>
                      <MenuItem value="6">Nigerian</MenuItem>
                      <MenuItem value="7">Brazilian</MenuItem>
                      <MenuItem value="8">Mexican</MenuItem>
                      <MenuItem value="9">Italian</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="chefForm-suggested-donation">
                  <FormControl>
                    <InputLabel htmlFor="outlined-adornment-amount">
                      Donation
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-amount"
                      startAdornment={
                        <InputAdornment position="start">$</InputAdornment>
                      }
                      label="Donation"
                      value={suggestedDonation}
                      onChange={(e) => setSuggestedDonation(e.target.value)}
                    />
                  </FormControl>
                </div>
              </div>

              
              <Box
                className="chefForm-menu-and-description"
                component="div"
                sx={{
                  "& .MuiTextField-root": { width: "100%" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="outlined-multiline-static"
                  label="Menu"
                  multiline
                  rows={20}
                  value={menu}
                  onChange={(e) => setMenu(e.target.value)}
                />
              </Box>

              

              <div className="chefForm-event-date-and-time">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="Start"
                    value={startValue}
                    onChange={(newValue) => {
                      console.log("newValue-->", newValue)
                      setStartValue(newValue);
                    }}
                    className="chefForm-event-start-date"
                    disablePast
                  />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="End"
                    value={endValue}
                    onChange={(newValue) => {
                      setEndValue(newValue);
                    }}
                    className="chefForm-event-end-date"
                    disablePast
                  />
                </LocalizationProvider>
              </div>

              <div className="chefForm-max-open-seats-container">
                <div className="chefForm-open-seats">
                  <TextField
                    label="Open Seats"
                    onChange={(e) => setOpenSeats(e.target.value)}
                    type="number"
                    value={openSeats}
                    InputProps={{
                      inputProps: { min: 0 },
                    }}
                  />
                </div>
                <div className="chefForm-max-seats">
                  <TextField
                    label="Max Seats"
                    onChange={(e) => setMax(e.target.value)}
                    type="number"
                    value={max}
                    InputProps={{
                      inputProps: { min: 0 },
                    }}
                  />
                </div>
              </div>
              <div className="chefForm-event-address-information">
                <div className="chefForm-address1">
                  <TextField
                    onChange={(e) => setAddress1(e.target.value)}
                    type="text"
                    value={address1}
                    label="Address 1"
                    fullWidth
                  />
                </div>
                <div className="chefForm-address2">
                  <TextField
                    onChange={(e) => setAddress2(e.target.value)}
                    type="text"
                    value={address2}
                    label="Address 2"
                    fullWidth
                  />
                </div>
                <div className="chefForm-city">
                  <TextField
                    onChange={(e) => setCity(e.target.value)}
                    type="text"
                    value={city}
                    label="City"
                    fullWidth
                  />
                </div>
                <div className="chefForm-state-and-zipcode">
                  <div className="chefForm-state">
                    <FormControl fullWidth>
                      <InputLabel>State</InputLabel>
                      <Select
                        onChange={(e) => setState(e.target.value)}
                        label="State"
                        value={state}
                      >
                        {states.map((state) => (
                          <MenuItem key={state} value={state}>
                            {state}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className="chefForm-zipcode">
                    <TextField
                      onChange={(e) => setZip(e.target.value)}
                      type="text"
                      value={zip}
                      label="Zip Code"
                    />
                  </div>
                </div>
              </div>
            </Box>

            <Button
              className="chefForm-button"
              onClick={() => handleSubmit()}
              variant="contained"
              sx={{
                "&:hover": { backgroundColor: "#EB5757", color: "whitesmoke" },
                backgroundColor: "#EB5757",
                color: "whitesmoke",
              }}
            >
              Edit Event
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default EditChefForm;
