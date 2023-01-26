import React from 'react'
import { TextField, Box } from "@mui/material"



const SearchBar = () => {
  return (
    <Box
    component="form"
    >
      <TextField id="outlined-basic" label="Location" />
    </Box>
  )
}

export default SearchBar
