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
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers/DateRangePicker";

const SearchBar = () => {
  const [numGuests, setNumGuests] = useState();

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
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={numGuests}
          label="Age"
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
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          localeText={{ start: "Check-in", end: "Check-out" }}
        >
          <DateRangePicker
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(startProps, endProps) => (
              <React.Fragment>
                <TextField {...startProps} />
                <Box sx={{ mx: 2 }}> to </Box>
                <TextField {...endProps} />
              </React.Fragment>
            )}
          />
        </LocalizationProvider>
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
