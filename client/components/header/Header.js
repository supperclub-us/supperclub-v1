import React, { useState } from 'react'
import { SearchBar, Map } from '../index'

const Header = () => {
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    // Quincy --> lat: 42.251389 lng: -71.002342
    latitude: 42.251389,
    longitude: -71.002342,
    zoom: 13,
  });

  return (
    <div>
      <h1>SUPPER CLUB</h1>
      <p>Sup'per, Y'all! See What's Around You!</p>
      <SearchBar viewport={viewport} setViewport={setViewport} />
      <Map viewport={viewport} setViewport={setViewport} />
    </div>
  )
}

export default Header

