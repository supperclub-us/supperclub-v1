import React, { useEffect, useState } from "react";
import {
  Box,
  FormGroup,
  Button
} from "@mui/material";
import MapboxAccessToken from "../../env";
import axios from "axios";
import "../searchBar/searchBar.css"
import Location from "../searchBar/Location";
import Guests from "../searchBar/Guests";
import StartEndDate from "../searchBar/StartEndDate";
import { setReduxViewport } from "../slices/viewportSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const MapSearchBar = ({ viewport, setViewport }) => {

  const reduxNumGuests = useSelector((state) => state.numGuests)
  const [numGuests, setNumGuests] = useState(reduxNumGuests);

  const reduxStartDate = useSelector((state) => state.startEndDate.startDate);
  const reduxEndDate = useSelector((state) => state.startEndDate.endDate)
  const [startDate, setStartDate] = useState(reduxStartDate);
  const [endDate, setEndDate] = useState(reduxEndDate);
  
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setReduxViewport(viewport));
  }, [value, viewport, dispatch])


  // FIX THIS
  const handleGuests = (e) => {
    setNumGuests(e.target.value);
  };

  const handleChange = async (event) => {
    setValue(event.target.value);
    try {
      const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${event.target.value}.json?access_token=${MapboxAccessToken}&autocomplete=true`;
      const response = await fetch(endpoint);
      const results = await response.json();
      setSuggestions(results?.features)
    } catch (error) {
      console.log("Error fetching data, ", error)
    }

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newViewport = await getCoordinates(value);
    dispatch(setReduxViewport(newViewport));
  };


  async function getCoordinates(address) {
    try {
      const { data } = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${MapboxAccessToken}`
      );
      console.log("THIS IS DATA RETURNED!!!!!!", data);
      const [lng, lat] = data.features[0].geometry.coordinates;
      console.log(`Latitude: ${lat}, Longitude: ${lng}`);
      setViewport({ ...viewport, latitude: lat, longitude: lng, zoom: 13})
      setLatitude(lat);
      setLongitude(lng);
      return {
        ...viewport,
        latitude: lat,
        longitude: lng,
        zoom: 13
      }
    } catch (err) {
      console.log(err);
    }
  };


  return (
    // will switch box to formControl
    <Box
      className="search-bar"
      variant="contained"
      sx={{ p: 2, border: "1px solid grey" }}>
      <Location handleChange={handleChange} value={value} setValue={setValue} suggestions={suggestions} setSuggestions={setSuggestions}
      />
      <Guests numGuests={numGuests} handleGuests={handleGuests}
      />
      <StartEndDate startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate}
      />
      <Button 
        onClick={handleSubmit}
        sx={{
          "&:hover": { backgroundColor: "#EB5757", color: "whitesmoke" },
          backgroundColor: "#EB5757",
          color: "whitesmoke",
        }}
      >
        Submit
      </Button>
    </Box>
  );
};

export default MapSearchBar;

