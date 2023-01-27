import React, { useState } from "react";
import ReactMapGL, { GeolocateControl, NavigationControl } from "react-map-gl";
import MapboxAccessToken from "../../env";
import 'mapbox-gl/dist/mapbox-gl.css'

const Map = () => {
  // console.log("///process.env///:", )

  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    // Quincy --> lat: 42.251389 lng: -71.002342
    latitude: 42.251389,
    longitude: -71.002342,
    zoom: 10,
  });
  // console.log("viewport", viewport);

  return (
    <div className="map-container">
      <ReactMapGL
        mapStyle="mapbox://styles/wragyu/clddwwwkk003m01ryz75nmy56/draft"
        mapboxAccessToken={MapboxAccessToken}
        {...viewport}
        onMove={(e) => {
          setViewport(e.viewport);
          // console.log("viewport", viewport);
        }}
      >
          <NavigationControl />

          <GeolocateControl />

      </ReactMapGL>
    </div>
  );
};

export default Map;
