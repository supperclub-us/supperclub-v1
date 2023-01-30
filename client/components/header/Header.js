import React, { useEffect, useState } from 'react'
import { SearchBar, Map } from '../index'
// import { setReduxViewport } from '../../slices/viewportSlice';
// import { useDispatch } from "react-redux";

const Header = () => {
  // const [viewport, setViewport] = useState({
  //   width: "100%",
  //   height: "100%",
  //   // Quincy --> lat: 42.251389 lng: -71.002342
  //   latitude: 42.251389,
  //   longitude: -71.002342,
  //   zoom: 13,
  // });

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log("HEADER VIEWPORT", viewport)
  //   dispatch(setReduxViewport(viewport));
  // }, [viewport, dispatch])

  return (
    <div>
      <h1>A tight-knit dining experience</h1>
      <SearchBar />
      {/* <Map viewport={viewport} setViewport={setViewport} /> */}
    </div>
  )
}

export default Header

