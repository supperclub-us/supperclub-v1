import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const guestRange = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
const Guests = ({ numGuests, handleGuests }) => {
  return (
    <FormControl className="form-control" sx={{ m: "1em" }}>
      <InputLabel id="demo-simple-select-label">Guests</InputLabel>
      <Select
        defaultValue={1}
        labelId="demo-simple-select-label"
        id="guestNumber-picker"
        value={numGuests}
        label="Guests"
        onChange={(e) => handleGuests(e)}
        sx={{ width: "25ch" }}
        placeholder="Guests"
      >
        {guestRange.map(num => (
          <MenuItem key={num} value={num}>{num === 1 ? `${num} guest` : `${num} guests`}</MenuItem>
        ))}

      </Select>
    </FormControl>
  );
};

export default Guests;
