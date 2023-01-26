import React, { useState } from "react";
import {
  TextField,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

const SearchBar = () => {
  const [numGuests, setNumGuests] = useState();

  const handleChange = (e) => {
    setNumGuests(e.target.value);
  };

  return (
    // will switch box to formControl
    <Box
      component="form"
      variant="contained"
      sx={{ p: 2, border: "1px solid grey" }}
    >
      <FormControl fullWidth>
        {/* //Location Field */}
        <TextField
          id="outlined-basic"
          label="Location"
          variant="outlined"
          sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
        />

        {/*Seats*/}

        {/* <InputLabel id="demo-simple-select-label">Guests</InputLabel> */}
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={numGuests}
          label="Age"
          onChange={handleChange}
          placeholder
        >

          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>

        {/*Pick a Date - calendar*/}
        <TextField
          id="outlined-basic"
          label="Location"
          variant="outlined"
          sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
        />

        {/*Distance*/}
        <TextField
          id="outlined-basic"
          label="Distance"
          variant="outlined"
          sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
        />
      </FormControl>
    </Box>
  );
};

export default SearchBar;
