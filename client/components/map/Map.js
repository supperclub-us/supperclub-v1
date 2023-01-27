import React, { useState } from "react";
import ReactMapGL from "react-map-gl";
import MapboxAccessToken from "../../env";

const Map = () => {
  // console.log("///process.env///:", )

  const [viewport, setViewport] = useState({
    width: "100%",
    height: "500vh",
    zoom: 10,
    // Quincy --> lat: 42.251389 lng: -71.002342
    latitude: 42.251389,
    longitude: -71.002342,
  });

  return (
    <div>
      <h1>Map Component!!!!</h1>
      <ReactMapGL
        {...viewport}
        mapStyle="mapbox://styles/wragyu/clddwwwkk003m01ryz75nmy56"
        mapboxAccessToken={MapboxAccessToken}
      ></ReactMapGL>
      <h1>Map Component!!!!</h1>
    </div>
  );
};

export default Map;
