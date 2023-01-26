import React from 'react'
import { TextField, Box } from "@mui/material"

const SearchBar = () => {
  return (
    <Box
    component="form"
    >
      <TextField id="outlined-basic" label="Location" variant="outlined"/>
    </Box>
  )
}

export default SearchBar
