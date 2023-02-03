import React, { useEffect, useState } from "react";
import { Box, FormGroup, Button } from "@mui/material";
import MapboxAccessToken from "../../env";
import axios from "axios";
import "./searchBar.css";
import Location from "./Location";
import Guests from "./Guests";
import StartEndDate from "./StartEndDate";
import { setReduxViewport } from "../slices/viewportSlice";
import { setReduxStartDate, setReduxEndDate } from "../slices/startEndDateSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";


const SearchBar = () => {
  const [numGuests, setNumGuests] = useState();
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [ latitude, setLatitude] = useState();
  const [ longitude, setLongitude ] = useState();

  const reduxViewport = useSelector((state) => state.viewport);

  const [viewport, setViewport] = useState(reduxViewport);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // FIX THIS
  const handleGuests = (e) => {
    setNumGuests(e.target.value);
  };

  const newStartDate = startDate.format('M DD YYYY').split(' ');
  const newEndDate = endDate.format('M DD YYYY').split(' ');


  const newIntStartDate = newStartDate.map((element) => parseInt(element))
  console.log("newIntStartDate", newIntStartDate)
  const newIntEndDate = newEndDate.map((element) => parseInt(element))
  console.log("newIntEndDate", newIntEndDate)


  // const handleStartDate = () => {
  //   console.log("START DATE", startDate)
  // };

  const handleChange = async (event) => {
    setValue(event.target.value);
    try {
      const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${event.target.value}.json?access_token=${MapboxAccessToken}&autocomplete=true`;
      const response = await fetch(endpoint);
      const results = await response.json();
      setSuggestions(results?.features);
    } catch (error) {
      console.log("Error fetching data, ", error);
    }
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const newViewport = await getCoordinates(value);
    console.log("VIEWPORT", viewport);
    dispatch(setReduxViewport(newViewport));
    navigate('/map');
  };

  async function getCoordinates(address) {
    try {
      const { data } = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${MapboxAccessToken}`
      );
      console.log("THIS IS DATA RETURNED!!!!!!", data);
      const [lng, lat] = data.features[0].geometry.coordinates;
      console.log(`Latitude: ${lat}, Longitude: ${lng}`);
      setViewport({ ...viewport, latitude: lat, longitude: lng, zoom: 13 });
      setLatitude(lat);
      setLongitude(lng);
      return {
        ...viewport,
        latitude: lat,
        longitude: lng,
        zoom: 13,
      };
    } catch (err) {
      console.log(err);
    }
  }

  // const setCenter = () => {
  //   setViewport({ latitude: lat, longitude: lng})
  // }

  return (
    // will switch box to formControl
    <Box
      className="search-bar"
      variant="contained"
      sx={{ p: 2, border: "1px solid grey" }}
    >
      <Location
        handleChange={handleChange}
        value={value}
        setValue={setValue}
        suggestions={suggestions}
        setSuggestions={setSuggestions}
      />
      <Guests numGuests={numGuests} handleGuests={handleGuests} />
      <StartEndDate
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
      <Button
        variant="contained"
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

export default SearchBar;
