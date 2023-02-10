import { Box } from '@mui/system'
import React from 'react'

const About = () => {

  return (
    <>
      <Box
        className="about-image"
        sx={{
          backgroundImage: `url(https://i.imgur.com/1yADk1l.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "50%",
          width: "100%",
          backgroundAttachment: "fixed",
          backgroundOrigin: "border-box",
          backgroundClip: "content-box",
          backgroundBlendMode: "normal",
          color: "#f5f5f5"
        }}
      >
      </Box>
    </>
  )
}

export default About
