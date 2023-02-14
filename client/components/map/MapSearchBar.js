import React, { useEffect, useState } from "react";
// import { GeolocateControl } from "react-map-gl";
import { Box, Button } from "@mui/material";
import axios from "axios";
import "../searchBar/searchBar.css";
import Location from "../searchBar/Location";
import Guests from "../searchBar/Guests";
import StartEndDate from "../searchBar/StartEndDate";
import { setReduxViewport } from "../slices/viewportSlice";
import {
  setReduxStartDate,
  setReduxEndDate,
  setReduxNumGuests,
} from "../slices/searchBarFilterSlice";
import { useDispatch } from "react-redux";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import "./map.css"

const MapSearchBar = ({
  viewport,
  setViewport,
  numGuests,
  setNumGuests,
  startDate,
  setStartDate,
  filterStartDate,
  setFilterStartDate,
  filterEndDate,
  setFilterEndDate,
  setFilterNumGuests,
  endDate,
  setEndDate,
}) => {
  // value that is input into the search bar
  const [value, setValue] = useState("");

  // actual suggestions that populate underneath the value
  const [suggestions, setSuggestions] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setReduxNumGuests(numGuests));
    dispatch(setReduxStartDate(newIntStartDate));
    dispatch(setReduxEndDate(newIntEndDate));
  }, [ numGuests, startDate, endDate ]);

  // formatting of start and end date to array of integers
  const newStartDate = startDate.format("MM DD YYYY").split(" ");
  const newEndDate = endDate.format("MM DD YYYY").split(" ");

  //change array elements to integers
  const newIntStartDate = newStartDate.map((element) => parseInt(element));
  const newIntEndDate = newEndDate.map((element) => parseInt(element));

  const handleStartDate = (newValue) => {
    setStartDate(newValue);
    setFilterStartDate(true);
    // dispatch(setReduxStartDate(newIntStartDate));
  };

  const handleEndDate = (newValue) => {
    setEndDate(newValue);
    setFilterEndDate(true);
    // dispatch(setReduxEndDate(newIntEndDate));
  };

  const handleGuests = (e) => {
    setNumGuests(e.target.value);
    setFilterNumGuests(true);
  };

  const handleReset = () => {
    setFilterStartDate(false);
    setFilterEndDate(false);
    setFilterNumGuests(false);
  };

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

  // submit function to map search and filter
  const handleSubmit = async (e) => {
    const newViewport = await getCoordinates(value);
    dispatch(setReduxViewport(newViewport));
  };

  async function getCoordinates(address) {
    try {
      if (address) {
        const { data } = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${process.env.MAPBOX_ACCESS_TOKEN_KEY}`
        );

        const [lng, lat] = data.features[0].geometry.coordinates;

        setViewport({ ...viewport, latitude: lat, longitude: lng, zoom: 11 });
        return {
          ...viewport,
          latitude: lat,
          longitude: lng,
          zoom: 11,
        };
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    // will switch box to formControl
    <Box
      // className="search-bar"
      variant="contained"
      sx={{ p: 2, border: "1px solid grey" }}
    >
      <Location
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        value={value}
        setValue={setValue}
        suggestions={suggestions}
        setSuggestions={setSuggestions}
        className="map-searchBar-input"
      />

      {/* <GeolocateControl /> */}
      <Guests numGuests={numGuests} handleGuests={handleGuests} />
      <StartEndDate
        startDate={startDate}
        setStartDate={setStartDate}
        handleStartDate={handleStartDate}
        handleEndDate={handleEndDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
      <Button 
        onClick={handleReset}
        variant="contained"
        sx={{
          "&:hover": { backgroundColor: "#EB5757", color: "whitesmoke" },
          backgroundColor: "#EB5757",
          color: "whitesmoke",
        }}
      > 
        Reset 
      </Button>
    </Box>
  );
};

export default MapSearchBar;
