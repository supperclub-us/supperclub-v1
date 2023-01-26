import React from 'react'
import { TextField, Box } from "@mui/material"

const SearchBar = () => {
  return (
    <Box
    component="form"
    variant="contained"
    sx={{ p: 2, border: '1px solid grey' }}
    >
      {/* //Location Field */}
      <TextField id="outlined-basic" label="Location" variant="outlined" sx={{'& > :not(style)': { m: 1, width: '25ch'}}}/>

      {/*Seats*/}
      <TextField id="outlined-basic" label="Seats" variant="outlined" sx={{'& > :not(style)': { m: 1, width: '25ch'}}}/>

      {/*Pick a Date - calendar*/}
      <TextField id="outlined-basic" label="Location" variant="outlined" sx={{'& > :not(style)': { m: 1, width: '25ch'}}}/>

      {/*Distanbc*/}
      <TextField id="outlined-basic" label="Location" variant="outlined" sx={{'& > :not(style)': { m: 1, width: '25ch'}}}/>
    </Box>
  )
}

export default SearchBar
