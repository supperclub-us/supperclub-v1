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
import { setReduxStartDate, setReduxEndDate, setReduxNumGuests } from "../slices/searchBarFilterSlice";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";

const MapSearchBar = ({ viewport, setViewport, numGuests, setNumGuests, startDate, setStartDate, filterStartDate, setFilterStartDate, filterEndDate, setFilterEndDate, setFilterNumGuests, endDate, setEndDate }) => {


  // value that is input into the search bar
  const [value, setValue] = useState('');

  // actual suggestions that populate underneath the value
  const [suggestions, setSuggestions] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setReduxViewport(viewport));
    dispatch(setReduxNumGuests(numGuests));
    dispatch(setReduxStartDate(newIntStartDate));
    dispatch(setReduxEndDate(newIntEndDate));
  }, [value, viewport, numGuests, startDate, endDate, dispatch])



  // formatting of start and end date to array of integers
  const newStartDate = startDate.format('MM DD YYYY').split(' ');
  const newEndDate = endDate.format('MM DD YYYY').split(' ');
  //change array elements to integers
  const newIntStartDate = newStartDate.map((element) => parseInt(element))
  console.log("newIntStartDate", newIntStartDate)
  const newIntEndDate = newEndDate.map((element) => parseInt(element))
  console.log("newIntEndDate", newIntEndDate)


  const handleStartDate = (newValue) => {
    setStartDate(newValue);
    setFilterStartDate(true);
    // dispatch(setReduxStartDate(newIntStartDate));
  }

  const handleEndDate = (newValue) => {
    setEndDate(newValue);
    setFilterEndDate(true);
    // dispatch(setReduxEndDate(newIntEndDate));
  }

  const handleGuests = (e) => {
    setNumGuests(e.target.value);
    setFilterNumGuests(true);
  };

  const handleReset = () => {
    setFilterStartDate(false)
    setFilterEndDate(false)
    setFilterNumGuests(false)
  }

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

  // submit function to map search and filter
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newViewport = await getCoordinates(value);
    dispatch(setReduxViewport(newViewport));
    // setFilterNumGuests(true);
    // dispatch(setReduxNumGuests(numGuests));



    // BOOLEAN Logic for handling the filter function in the map search bar - need conditional logic


    // if(filterStartDate && filterEndDate) {

    // }

  };


  async function getCoordinates(address) {
    try {
      const { data } = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${MapboxAccessToken}`
      );
      console.log("THIS IS DATA RETURNED!!!!!!", data);
      const [lng, lat] = data.features[0].geometry.coordinates;
      console.log(`Latitude: ${lat}, Longitude: ${lng}`);
      setViewport({ ...viewport, latitude: lat, longitude: lng, zoom: 11 })
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
  };


  return (
    // will switch box to formControl
    <Box
      className="search-bar"
      variant="contained"
      sx={{ p: 2, border: "1px solid grey" }}>
      <Location style={{ borderRadius: "50px" }} sx={{ borderRadius: "50px" }} handleChange={handleChange} value={value} setValue={setValue} suggestions={suggestions} setSuggestions={setSuggestions}
      />
      <Button
        onClick={handleSubmit}
        sx={{
          "&:hover": { backgroundColor: "#EB5757", color: "whitesmoke" },
          backgroundColor: "#EB5757",
          color: "whitesmoke",
        }}
      >
        Locate
      </Button>
      <Guests numGuests={numGuests} handleGuests={handleGuests}
      />
      <StartEndDate startDate={startDate} setStartDate={setStartDate} handleStartDate={handleStartDate} handleEndDate={handleEndDate} endDate={endDate} setEndDate={setEndDate}
      />
      <Button onClick={handleReset}> Reset </Button>
    </Box>
  );
};

export default MapSearchBar;

