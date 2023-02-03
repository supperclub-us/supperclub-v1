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
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

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

            <div className="chefForm-container">
              <div className="chefEvent-form-address">
                <TextField
                  onChange={handleChange}
                  type="text"
                  placeholder="Address 1"
                  name="address1"
                />
              </div>
              <TextField
                onChange={handleChange}
                type="text"
                placeholder="Address 2 (optional)"
                name="address2"
              />
              <TextField
                onChange={handleChange}
                type="text"
                placeholder="City"
                name="city"
              />
              <select name="state" onChange={handleChange}>
                <option disabled>--Select State--</option>
                {states.map((state) => (
                  <option key={state} name="state">
                    {state}
                  </option>
                ))}
              </select>
              <TextField
                onChange={handleChange}
                type="text"
                placeholder="Zip code"
                name="zip code"
              />
            </div>

            <div className="chefForm-cuisines-category-container">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Cuisine</InputLabel>
                    <Select
                      onChange={(e)=> setCuisine(e.target.value)}
                      value={cuisine}
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

            <div className="chefEvent-form-divs">
              <label> Menu and Description </label>
              <textarea
                onChange={handleChange}
                type="text"
                placeholder="Menu"
                name="menu"
                maxLength={1000}
                style={{
                  maxWidth: "100%",
                  minHeight: "60px",
                  maxHeight: "200px",
                }}
              />
            </div>
            
            <div className="chefEvent-form-divs">
              <label htmlFor="suggested donation">Suggested Donation</label>
              <TextField
              onChange={handleChange}
              type="text"
              placeholder="Suggested donation per seat"
              name="suggested donation"
              />
            </div>
            <div className="chefEvent-form-divs">
              <label htmlFor="start time">Select Event Date and Time</label>
              <TextField
                onChange={handleChange}
                type="datetime-local"
                placeholder="start date time"
                name="start"
              />
            </div>
            <div className="chefEvent-form-divs">
              <label htmlFor="end time"> Select Event End</label>
              <TextField
                onChange={handleChange}
                type="datetime-local"
                placeholder="End date time"
                name="end"
              />
            </div>
            <div className="chefEvent-form-divs">
              <label htmlFor=""> Max Number of Seats </label>
              <TextField
                onChange={handleChange}
                type="number"
                placeholder="Max seats"
                name="max seats"
                min="0"
                max="100"
              />
            </div>
            <div className="chefEvent-form-divs">
              <label htmlFor=""> Select Number of Open Seats </label>
              <TextField
                onChange={handleChange}
                type="number"
                placeholder="Open seats"
                name="open seats"
                min="0"
                max="100"
              />
            </div>


            <Button onClick={() => handleSubmit()} variant="contained"> Add Event </Button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChefForm;
