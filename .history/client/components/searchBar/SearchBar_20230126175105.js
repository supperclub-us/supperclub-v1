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

const SearchBar = () => {
  const [numGuests, setNumGuests] = useState();
  const [startdate, setDate] = useState()
  const [distance, setDistance] = useState()

  const handleChange = (e) => {
    setNumGuests(e.target.value);
  };

  const handleDistance = (e) => {
    setDistance(e.target.value);
  };

  return (
    // will switch box to formControl
    <Box className="search-bar" variant="contained" sx={{ p: 2, border: "1px solid grey" }}>
      <FormControl>
        <TextField
          id="outlined-basic"
          label="Location"
          variant="outlined"
          sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
        />
      </FormControl>

      <FormControl>
        <InputLabel id="demo-simple-select-label">Guests</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="guestNumber-picker"
          value={numGuests}
          label="Guests"
          onChange={handleChange}
          sx={{ m: 1, width: "25ch" }}
          placeholder="Guests"
        >
          <MenuItem value={10}>1</MenuItem>
          <MenuItem value={20}>2</MenuItem>
          <MenuItem value={30}>3</MenuItem>
        </Select>
      </FormControl>

      <FormControl>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Start Date"
            value={date}
            onChange={(date) => {
              setDate(date);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </FormControl>

      <FormControl>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="End Date"
            value={date}
            onChange={(date) => {
              setDate(date);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </FormControl>

    </Box>
  );
};

export default SearchBar;
