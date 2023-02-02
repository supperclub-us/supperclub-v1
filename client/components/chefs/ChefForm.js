import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  addSingleChefBooking,
  fetchSingleChefBooking,
  selectSingleChefBookings,
} from "../slices/singleChefBookingsSlice";
import { fetchSingleChef, selectSingleChef } from "../slices/singleChefSlice";
import { Home } from "../index"
import MapBoxAccessToken from "../../env";
import axios from "axios";
import "./chefForm.css";
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Link, OutlinedInput, InputAdornment } from "@mui/material";
import { Box } from "@mui/system";
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';


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

const ChefForm = () => {
  const userId = useSelector((state) => state.auth.me.id);
  console.log("userId--->", userId);

  const [startValue, setStartValue] = useState(dayjs());
  const [endValue, setEndValue] = useState(dayjs());

  const [title, setTitle] = useState();
  const [menu, setMenu] = useState();
  const [suggestedDonation, setSuggestedDonation] = useState(); 
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [max, setMax] = useState();
  const [openSeats, setOpenSeats] = useState();
  const [address1, setAddress1] = useState();
  const [address2, setAddress2] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [zip, setZip] = useState();
  const [cuisine, setCuisine] = useState();

  const { chefId } = useParams();
  console.log("CHEF -----------> ", chefId);

  // the different states from the selectSingleChef State
  const { currentChef, isLoading, error } = useSelector(selectSingleChef);

  const dispatch = useDispatch();

  useSelector(selectSingleChefBookings);
  useSelector(selectSingleChef);

  useEffect(() => {
    dispatch(fetchSingleChef(userId));
    dispatch(fetchSingleChefBooking(userId));
  }, []);

  // handle submit for chef form
  const handleSubmit = async (e) => {
    console.log("handleSubmit clicked!")
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
          addSingleChefBooking({
            id: userId,
            title,
            menu,
            suggestedDonation,
            start,
            end,
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

  // handle change that will<TextField the useState values and use those values in the addSingleChefBooking action/extraReducers
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log("LINE 152-------------------->", { name, value });
    if (name === "title") setTitle(value);
    if (name === "menu") setMenu(value);
    if (name === "suggested donation") setSuggestedDonation(value);
    if (name === "start") setStart(value);
    if (name === "end") setEnd(value);
    if (name === "max seats") setMax(value);
    if (name === "open seats") setOpenSeats(value);
    if (name === "address1") setAddress1(value);
    if (name === "address2") setAddress2(value);
    if (name === "city") setCity(value);
    if (name === "state") setState(value);
    if (name === "zip code") setZip(value);
  };

  return (
    <>
      {userId !== parseInt(chefId) ? (
        <Home/>
      ) : (
        <div className="chefEvent-container">
          <form onSubmit={handleSubmit} className="chefEvent-form">

            <div className="chefForm-title-of-event">
              <TextField
                onChange={handleChange}
                type="text"
                placeholder="Title of event"
                name="title"
                fullWidth
              />
            </div>

            <div className="chefEvent-cuisineCategory">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Cuisine</InputLabel>
                <Select
                  onChange={(e)=> setCuisine(e.target.value)}
                  value={cuisine}
                  label="cuisine"
                >
                  <MenuItem value="Chinese">Chinese</MenuItem>
                  <MenuItem value="Japanese">Japanese</MenuItem>
                  <MenuItem value="Indian">Indian</MenuItem>
                  <MenuItem value="French">French</MenuItem>
                  <MenuItem value="Thai">Thai</MenuItem>
                  <MenuItem value="Mexican">Mexican</MenuItem>
                  <MenuItem value="Brazilian">Brazilian</MenuItem>
                  <MenuItem value="Italian">Italian</MenuItem>
                </Select>
              </FormControl>
            </div>

            <Box 
              className="chefForm-menu-and-description"
              component="form"
              sx={{
                '& .MuiTextField-root': {width: '100%' },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-multiline-static"
                label="Menu"
                multiline
                rows={20}
                // defaultValue="Type your menu here"
                placeholder="Type your menu here"
              />
            </Box>

            <div className="chefForm-suggested-donation">
              <FormControl fullWidth>
                <InputLabel htmlFor="outlined-adornment-amount">Donation</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  startAdornment={<InputAdornment position="start">$</InputAdornment>}
                  label="Donation"
                  placeholder="Suggested donation per member to chef"
                />
              </FormControl>
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
              /> 
            </LocalizationProvider>

            </div>
            
          </form>
          <Button onClick={() => handleSubmit()} variant="contained"> Add Event </Button>

        </div>
      )}
    </>
  );
};

export default ChefForm;


{/* <div className="chefForm-your-host">
  <p>
    Your Host: {<Link 
                  underline="hover"
                  href={`/chefs/`}
                >
                  {currentChef.role === "CHEF" ? `Chef ${currentChef.firstName} ${currentChef.lastName}` : null}
                </Link>} 
  </p>
</div> */}