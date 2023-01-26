import React from 'react'
import { TextField, Box, Select, MenuItem } from "@mui/material"

const SearchBar = () => {
  return (
    // will switch box to formControl
    <Box
    component="form"
    variant="contained"
    sx={{ p: 2, border: '1px solid grey' }}
    >
      {/* //Location Field */}
      <TextField id="outlined-basic" label="Location" variant="outlined" sx={{'& > :not(style)': { m: 1, width: '25ch'}}}/>

      {/*Seats*/}
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={}
        label="Age"
        onChange={}
      >
        <MenuItem><MenuItem
      </Select>

      {/*Pick a Date - calendar*/}
      <TextField id="outlined-basic" label="Location" variant="outlined" sx={{'& > :not(style)': { m: 1, width: '25ch'}}}/>

      {/*Distance*/}
      <TextField id="outlined-basic" label="Distance" variant="outlined" sx={{'& > :not(style)': { m: 1, width: '25ch'}}}/>
    </Box>
  )
}

export default SearchBar
