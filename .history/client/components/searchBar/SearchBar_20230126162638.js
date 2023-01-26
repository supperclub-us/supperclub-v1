import React, { useState } from 'react'
import { TextField, Box, Select, MenuItem, InputLabel } from "@mui/material"

const SearchBar = () => {

  const [ numGuests, setNumGuests ] = useState()

  const handleChange = (e) => {
    setNumGuests(e.target.value)
  }

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

      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={age}
    label="Age"
    onChange={handleChange}
  >
    <MenuItem value={10}>Ten</MenuItem>
    <MenuItem value={20}>Twenty</MenuItem>
    <MenuItem value={30}>Thirty</MenuItem>
  </Select>
</FormControl>

      {/*Pick a Date - calendar*/}
      <TextField id="outlined-basic" label="Location" variant="outlined" sx={{'& > :not(style)': { m: 1, width: '25ch'}}}/>

      {/*Distance*/}
      <TextField id="outlined-basic" label="Distance" variant="outlined" sx={{'& > :not(style)': { m: 1, width: '25ch'}}}/>
    </Box>
  )
}

export default SearchBar
