import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, useNavigate, useParams } from "react-router-dom";
import {
  addSingleChefBooking,
  fetchSingleChefBooking,
} from "../slices/singleChefBookingsSlice";
import {
  editSingleBooking,
  fetchSingleBookingAsync,
  selectSingleBooking,
  deleteSingleBooking,
} from "../slices/singleBookingSlice";
import { fetchSingleChef, selectSingleChef } from "../slices/singleChefSlice";
import { Home, Upload } from "../index";
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
  Snackbar,
  Alert,
  Stack,
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
  "GU",
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
  "TT",
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
  const dispatch = useDispatch();
  const { chefId, bookingsId } = useParams();
  const { booking } = useSelector(selectSingleBooking);

  const [title, setTitle] = useState("");
  const [menu, setMenu] = useState("");
  const [cuisineId, setCuisineId] = useState("");
  const [suggestedDonation, setSuggestedDonation] = useState("");
  const [startValue, setStartValue] = useState(dayjs());
  const [endValue, setEndValue] = useState(dayjs());
  const [max, setMax] = useState("");
  const [openSeats, setOpenSeats] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [openEditConfirm, setOpenEditConfirm] = useState(false);
  const [openWarningConfirm, setOpenWarningConfirm] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    dispatch(fetchSingleBookingAsync(bookingsId));
  }, []);

  // useEffect ------------------------------------------------------
  useEffect(() => {
    if (booking) {
      setTitle(booking.title);
      setCuisineId(booking.cuisineId);
      setSuggestedDonation(booking.suggestedDonation || ""); // Default is null
      setMenu(booking.menu);
      setImageUrl(booking.imageUrl)
      setStartValue(dayjs(`${booking.startDateTime}`, "MM/DD/YYYY h:mmA"));
      setEndValue(dayjs(`${booking.endDateTime}`, "MM/DD/YYYY h:mmA"));
      setMax(booking.maxSeats);
      setOpenSeats(booking.openSeats);
      setAddress1(booking.address1);
      setAddress2(booking.address2 || ""); // Default is null
      setCity(booking.city);
      setState(booking.state);
      setZip(booking.zipCode);
    }
  }, [booking]);

  const handleSnackCloseEdit = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenEditConfirm(false);
  };

  const handleSnackCloseWarning = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenWarningConfirm(false);
  };

  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.me);
  // console.log("USER", user);
  // console.log("USER.id", user.id);

  // handle submit for chef form
  const handleSubmit = async () => {
    // console.log("handleSubmit clicked! in EditChefForm.js!");
    setOpenEditConfirm(true);

    setTimeout(() => {
      setOpenEditConfirm(false);
      navigate(`/users/chefprofile/${user.id}`);
    }, 1500);

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
          editSingleBooking({
            id: userId,
            title,
            cuisineId,
            menu,
            imageUrl: imageUrl,
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
            bookingsId,
          })
        );
      }
    } catch (err) {}
  };
  // useEffect ---------------------------------------------------------

  // Warning Click handle button
  const handleWarning = async () => {
    setOpenWarningConfirm(true);
  };

  // chefId, bookingsId from useParams
  const handleDelete = async () => {
    try {
      await dispatch(
        deleteSingleBooking({
          chefId: chefId,
          bookingsId: bookingsId,
        })
      );
      navigate(`/users/chefprofile/${chefId}`);
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
            <Box component="form" className="chefEvent-form">
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
                    <InputLabel id="demo-simple-select-label">
                      Cuisine
                    </InputLabel>
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
                      <MenuItem value="10">Fusion</MenuItem>
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

                <div>
                  <img src={imageUrl} style={{
                    height: "213px",
                  }}/>
                </div>

              <div>
                <Upload setImageUrl={setImageUrl} />
              </div>

              <div className="chefForm-event-date-and-time">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="Start"
                    value={startValue}
                    onChange={(newValue) => {
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

            <div>
              <Button
                className="chefForm-button-Edit"
                onClick={() => handleSubmit()}
                variant="contained"
                sx={{
                  "&:hover": {
                    backgroundColor: "#EB5757",
                    color: "whitesmoke",
                  },
                  backgroundColor: "#EB5757",
                  color: "whitesmoke",
                }}
              >
                Edit
              </Button>

              <Button
                className="chefForm-button-remove"
                onClick={handleWarning}
                variant="contained"
                sx={{
                  "&:hover": {
                    backgroundColor: "#EB5757",
                    color: "whitesmoke",
                  },
                  backgroundColor: "#EB5757",
                  color: "whitesmoke",
                }}
              >
                Delete
              </Button>

              <Snackbar
                open={openEditConfirm}
                autoHideDuration={10000}
                onClose={handleSnackCloseEdit}
              >
                <Alert
                  onClose={handleSnackCloseEdit}
                  severity="success"
                  sx={{ width: "100%" }}
                >
                  You successfully edited an event!
                </Alert>
              </Snackbar>

              <Snackbar
                open={openWarningConfirm}
                autoHideDuration={10000}
                onClose={handleSnackCloseWarning}
              >
                <Alert
                  onClose={handleSnackCloseWarning}
                  severity="warning"
                  sx={{ width: "100%" }}
                  action={
                    <div>
                      <Button
                        color="inherit"
                        size="small"
                        onClick={handleDelete}
                      >
                        DELETE
                      </Button>
                      <Button
                        color="inherit"
                        size="small"
                        onClick={handleSnackCloseWarning}
                      >
                        CANCEL
                      </Button>
                    </div>
                  }
                >
                  Are you sure you want to delete this event?
                </Alert>
              </Snackbar>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default EditChefForm;
