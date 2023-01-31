import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const Guests = ({ numGuests, handleGuests }) => {
  return (
    <FormControl className="form-control" sx={{ m: "1em" }}>
      <InputLabel id="demo-simple-select-label">Guests</InputLabel>
      <Select
        defaultValue={""}
        labelId="demo-simple-select-label"
        id="guestNumber-picker"
        value={numGuests}
        label="Guests"
        onChange={handleGuests}
        sx={{ width: "25ch" }}
        placeholder="Guests"
      >
        <MenuItem value="1">1</MenuItem>
        <MenuItem value="2">2</MenuItem>
        <MenuItem value="3">3</MenuItem>
      </Select>
    </FormControl>
  );
};

export default Guests;
