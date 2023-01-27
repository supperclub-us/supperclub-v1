import React, { useState, useEffect } from "react";
import ReactMapGL, {
  GeolocateControl,
  NavigationControl,
  Marker,
  Popup,
} from "react-map-gl";
import { useDispatch, useSelector } from "react-redux";
import { fetchChefsBookingsAsync } from "../slices/chefsBookingsSlice";
import MapboxAccessToken from "../../env";
import "mapbox-gl/dist/mapbox-gl.css";
import "./map.css";
import axios from "axios";

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

  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  const [coordinates, setCoordinates] = useState();
  // console.log("viewport", viewport);

  const bookings = useSelector((state) => state.chefsBookings);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchChefsBookingsAsync());
  }, []);

  console.log(bookings);

  const addresses =
    bookings &&
    bookings.map((booking) => {
      return `${booking.address1} ${booking.city} ${booking.state}`;
    });

  console.log(addresses);

  // input is a singular address as PARAM in getCoordinates FN
  async function getCoordinates(address) {
    try {
      const { data } = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${MapboxAccessToken}`
      );
      console.log("THIS IS DATA RETURNED!!!!!!",data);
      const [lng, lat] = data.features[0].geometry.coordinates;
      console.log(`Latitude: ${lat}, Longitude: ${lng}`);
      setLatitude(lat);
      setLongitude(lng);
    } catch (err) {
      console.log(err);
    }
  }
  // OUTPUT is a singular LAT and LONG value that is set in state

  console.log("GET COORDINATES RESULTS: ", getCoordinates(addresses[0]))
  getCoordinates(addresses[0]);

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
        {/* {addresses &&
          addresses.map((address) => {
            const coordinate = getCoordinates(address);
            console.log(coordinate)
          })} */}
              <Marker longitude={longitude} latitude={latitude}>
                <img
                  className="map-pineapple-image"
                  src="/pineapple.png"
                  alt="MARKER"
                />
              </Marker>
      </ReactMapGL>
    </div>
  );
};

export default Map;
