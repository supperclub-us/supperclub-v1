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

const MapSearchBar = ({ viewport, setViewport }) => {
  const [numGuests, setNumGuests] = useState();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  // const [latitude, setLatitude] = useState(null);
  // const [longitude, setLongitude] = useState(null);

  // const reduxViewport = useSelector((state) => state.viewport);

  // const [viewport, setViewport] = useState(
  //   reduxViewport
  // );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // console.log("RELOAD")
    // console.log("SEARCH VALUE", value)
    // console.log("SEARCH BAR VIEWPORT", viewport);
    dispatch(setReduxViewport(viewport));
  }, [value, viewport, dispatch])

  // useEffect(() => {
  //   navigate('/map');
  // }, [setLatitude])

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
      console.log("RESULTS ---->", results)
    } catch (error) {
      console.log("Error fetching data, ", error)
    }

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newViewport = await getCoordinates(value);
    console.log("VIEWPORT", viewport)
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

  // const setCenter = () => {
  //   setViewport({ latitude: lat, longitude: lng})
  // }

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
      <Button onClick={handleSubmit}>Submit</Button>
    </Box>
  );
};

export default MapSearchBar;

