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
  const [numGuests, setNumGuests] = useState(null);
  const [date, setDate] = useState(null)

  const handleChange = (e) => {
    setNumGuests(e.target.value);
  };

  return (
    // will switch box to formControl
    <Box variant="contained" sx={{ p: 2, border: "1px solid grey" }}>
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
          id="demo-simple-select"
          value={numGuests}
          label="Guests"
          onChange={handleChange}
          sx={{ m: 1, width: "25ch" }}
          placeholder="Guests"
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>

      <FormControl>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Basic example"
            value={date}
            onChange={(date) => {
              setDate(date);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </FormControl>

      <FormControl>
        <InputLabel id="demo-simple-select-label">Distance</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={numGuests}
          label="distance"
          onChange={handleChange}
          sx={{ m: 1, width: "25ch" }}
          placeholder="Guests"
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>

    </Box>
  );
};

export default SearchBar;

// {/* <TextField
// id="outlined-basic"
// label="Location"
// variant="outlined"
// sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
// />
// <div>
// {/*Seats*/}
// <InputLabel id="guestsDropdown">Guests</InputLabel>
// <Select
//   labelId="guestsDropdown"
//   id="guestsDropdown"
//   value={numGuests}
//   label="Age"
//   onChange={handleChange}
//   placeholder="Guests"
// >
//   <MenuItem value={1}>1</MenuItem>
//   <MenuItem value={2}>2</MenuItem>
//   <MenuItem value={3}>3</MenuItem>
// </Select>
// </div>

// {/*Pick a Date - calendar*/}
// <TextField
// id="outlined-basic"
// label="Location"
// variant="outlined"
// sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
// />
// {/*Distance*/}
// <TextField
// id="outlined-basic"
// label="Distance"
// variant="outlined"
// sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
// /> */}
