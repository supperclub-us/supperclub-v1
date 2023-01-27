import React, { useState } from "react";
import {
  TextField,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import styled from "styled-components";
import useInput from "./useInput";
import "./searchBar.css"

const SearchBar = () => {
  const [numGuests, setNumGuests] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();


  const handleChange = (e) => {
    setNumGuests(e.target.value);
  };

  const handleDistance = (e) => {
    setDistance(e.target.value);
  };

  const address = useInput("");
  console.log("ADDRESS", address)

  return (
    // will switch box to formControl
    <Box
      className="search-bar"
      variant="contained"
      sx={{ p: 2, border: "1px solid grey"}}
    >
      <FormControl className="form-control" sx={{display: "flex", justifyContent: "flex-start", alignItems: "flex-start", m: "1em"}}>
        <TextField
          id="outlined-basic"
          label="Location"
          variant="outlined"
          {...address}
        />
        {address.suggestions?.length > 0 && (
        <Box className="searchBar-suggestionWrapper" sx={{ bgcolor: '#FCFCFC', position:'absolute', width: 400, mt: 7, mb: 0, mx: 0, borderRadius: '5px', boxShadow: 3}} >
          {address.suggestions.map((suggestion, index) => {
            return (
              <Box className="searchBar-suggestion" sx={{maxWidth: 400, p: 0.4}} key={index}
              onClick={() => {
                address.setValue(suggestion.place_name);
                address.setSuggestions([]);
              }}>
                {suggestion.place_name}
              </Box>
            )
          })}
        </Box>
        )}
      </FormControl>

      <FormControl className="form-control" sx={{m: "1em"}}>
        <InputLabel id="demo-simple-select-label">
          Guests
        </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="guestNumber-picker"
            value={numGuests}
            label="Guests"
            onChange={handleChange}
            sx={{ width: "25ch" }}
            placeholder="Guests"
          >
            <MenuItem value={10}>1</MenuItem>
            <MenuItem value={20}>2</MenuItem>
            <MenuItem value={30}>3</MenuItem>
          </Select>

      </FormControl>

      <FormControl className="form-control" sx={{m: "1em"}}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(date) => {
              setStartDate(date);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </FormControl>

      <FormControl className="form-control" sx={{m: "1em"}}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={(date) => {
              setEndDate(date);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </FormControl>
    </Box>
  );
};

export default SearchBar;

