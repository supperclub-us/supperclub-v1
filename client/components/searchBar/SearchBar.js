import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import axios from "axios";
import "./searchBar.css";
import Location from "./Location";

import { setReduxViewport } from "../slices/viewportSlice";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";


const SearchBar = () => {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [ latitude, setLatitude] = useState();
  const [ longitude, setLongitude ] = useState();

  const reduxViewport = useSelector((state) => state.viewport);

  const [viewport, setViewport] = useState(reduxViewport);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = async (event) => {
    setValue(event.target.value);
    try {
      const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${event.target.value}.json?access_token=${process.env.MAPBOX_ACCESS_TOKEN_KEY}&autocomplete=true`;
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
    dispatch(setReduxViewport(newViewport));
    navigate('/map');
  };

  async function getCoordinates(address) {
    try {
      const { data } = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${process.env.MAPBOX_ACCESS_TOKEN_KEY}`
      );
      const [lng, lat] = data.features[0].geometry.coordinates;
      setViewport({ ...viewport, latitude: lat, longitude: lng, zoom: 11})
      setLatitude(lat);
      setLongitude(lng);
      return {
        ...viewport,
        latitude: lat,
        longitude: lng,
        zoom: 11
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    // will switch box to formControl
    <Box
      className="search-bar-container"
      variant="contained"
    >
      <Location
        handleChange={handleChange}
        value={value}
        setValue={setValue}
        suggestions={suggestions}
        setSuggestions={setSuggestions}
        handleSubmit={handleSubmit}
      />
      {/* <Button
        variant="contained"
        onClick={handleSubmit}
        sx={{
          "&:hover": { backgroundColor: "#EB5757", color: "whitesmoke" },
          backgroundColor: "#EB5757",
          color: "whitesmoke",
        }}
      >
        Search
      </Button> */}
    </Box>
  );
};

export default SearchBar;
