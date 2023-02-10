import React, { useEffect, useState } from 'react'
import { SearchBar, Map } from '../index'
import { Box } from '@mui/system'


const Header = () => {


  return (
    <div>
      <h1>A tight-knit dining experience</h1>
      <SearchBar />
      <Box
        className="about-image"
        sx={{
          backgroundImage: `url(https://i.imgur.com/1yADk1l.jpg)`,
          backgroundSize: "cover",
          
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "100vh",
          width: "100%",
          backgroundAttachment: "fixed",
          backgroundOrigin: "border-box",
          backgroundClip: "content-box",
          backgroundBlendMode: "normal",
          color: "#f5f5f5"
        }}
      >
      </Box>
    </div>
  )
}

export default Header

