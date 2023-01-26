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
    <Box variant="contained" sx={{ p: 2, border: "1px solid grey" }}>
      <FormControl>
        {/* //Location Field */}
       
      </FormControl>
    </Box>
  );
};

export default SearchBar;
