import React, { useEffect, useState } from "react";
import {
  Box,
  FormGroup,
  Button
} from "@mui/material";
import MapboxAccessToken from "../../env";
import axios from "axios";
import "./searchBar.css"
import Location from "./Location";
import Guests from "./Guests";
import StartEndDate from "./StartEndDate";

const SearchBar = () => {
  const [numGuests, setNumGuests] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);


  useEffect(() => {
    console.log("RELOAD")
    console.log("SEARCH VALUE", value)
  }, [value])

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

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    await getCoordinates(value)
  };

  async function getCoordinates(address) {
    try {
      const { data } = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${MapboxAccessToken}`
      );
      console.log("THIS IS DATA RETURNED!!!!!!", data);
      const [lng, lat] = data.features[0].geometry.coordinates;
      console.log(`Latitude: ${lat}, Longitude: ${lng}`);
      setLatitude(lat);
      setLongitude(lng);
    } catch (err) {
      console.log(err);
    }
  };

  // export const setCenter(lat, long) => {

  // }

  return (
    // will switch box to formControl
    <Box
      className="search-bar"
      variant="contained"
      sx={{ p: 2, border: "1px solid grey" }}>
      <FormGroup>
        <Location handleChange={handleChange} value={value} setValue={setValue} suggestions={suggestions} setSuggestions={setSuggestions}
        />
        <Guests numGuests={numGuests} handleGuests={handleGuests}
        />
        <StartEndDate startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate}
        />
        <Button onClick={handleSubmit}>Submit</Button>
      </FormGroup>
    </Box>
  );
};

export default SearchBar;

