import React, { useState, useEffect } from "react";
import ReactMapGL, {
  GeolocateControl,
  NavigationControl,
  Marker,
  Popup,
} from "react-map-gl";
import { useDispatch, useSelector } from "react-redux";
import { fetchChefsBookingsAsync } from "../slices/chefsBookingsSlice";
import { MapSearchBar, SidebarList } from "../index";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { setReduxViewport } from "../slices/viewportSlice";
import "mapbox-gl/dist/mapbox-gl.css";
import "./map.css";


const Map = ({ user }) => {
  // states for the selected markers and their popups
  const [selectedMarker, setSelectedMarker] = useState(null);

  // adding a flag so that bookings doesn't get called everytime we move the map around

  const [hasFetchedBookings, setHasFetchedBookings] = useState(false);

  // REDUX SLICE CALLS
  const reduxViewport = useSelector((state) => state.viewport);
  const reduxNumGuests = useSelector((state) => state.searchBarFilter.numGuests)
  const reduxStartDate = useSelector((state) => state.searchBarFilter.startDate);
  const reduxEndDate = useSelector((state) => state.searchBarFilter.endDate)

  const [numGuests, setNumGuests] = useState(reduxNumGuests);
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());

  // boolean logic useStates
  const [filterNumGuests, setFilterNumGuests] = useState(false);
  const [filterStartDate, setFilterStartDate] = useState(false);
  const [filterEndDate, setFilterEndDate] = useState(false);


  // useState for the bounds which will be how we filter out what is rendered in the sidebar
  const [bounds, setBounds] = useState({
    latitude: [-42.1, -43.26],
    longitude: [72.01, 72.5],
  });

  const [viewport, setViewport] = useState(reduxViewport);

  const rawDate = dayjs().format('MM/DD/YYYY hh:mmA')

  const currentDateTime = rawDate.split(' ');
  const currentDate = currentDateTime[0].split('/');

  const intCurrentDate = currentDate.map((element) => parseInt(element));


  //FILTER LOGIC
  // selecting all bookings that have been created
  const bookings = useSelector((state) => state.chefsBookings);

  // get the current date right now

  const filteredBookings = bookings.filter((booking) => {
    const bookingBooking = booking.startDateTime;

    const bookingDateTime = booking.startDateTime.split(' ');
    const bookingDate = bookingDateTime[0].split('/');

    const intBookingDate = bookingDate.map((element) => parseInt(element));



    // filter from current date onward
    // return currentDate and onwards
    if (dayjs().isBefore(dayjs(`${intBookingDate[2]}-${intBookingDate[0]}-${intBookingDate[1]}`))) {
      // logic to filter map bounds on start/end dates
      if (filterNumGuests && filterStartDate && filterEndDate) {
        return (
          booking.latitude >= bounds.latitude[0] &&
          booking.latitude <= bounds.latitude[1] &&
          booking.longitude >= bounds.longitude[0] &&
          booking.longitude <= bounds.longitude[1] &&

          // year
          reduxStartDate[2] == intBookingDate[2] &&
          // edgeCase:booking near the end of the year
          // month
          reduxStartDate[0] <= intBookingDate[0] &&
          reduxEndDate[0] >= intBookingDate[0] &&
          // day
          reduxStartDate[1] <= intBookingDate[1] &&
          reduxEndDate[1] >= intBookingDate[1] &&

          booking.openSeats >= reduxNumGuests

        )
      }

      if (filterStartDate && filterEndDate) {
        return (
          booking.latitude >= bounds.latitude[0] &&
          booking.latitude <= bounds.latitude[1] &&
          booking.longitude >= bounds.longitude[0] &&
          booking.longitude <= bounds.longitude[1] &&
          // year
          reduxStartDate[2] == intBookingDate[2] &&
          // edgeCase:booking near the end of the year
          // month
          reduxStartDate[0] <= intBookingDate[0] &&
          reduxEndDate[0] >= intBookingDate[0] &&
          // day
          reduxStartDate[1] <= intBookingDate[1] &&
          reduxEndDate[1] >= intBookingDate[1]
        )
      }

      if (filterNumGuests) {
        return (
          booking.latitude >= bounds.latitude[0] &&
          booking.latitude <= bounds.latitude[1] &&
          booking.longitude >= bounds.longitude[0] &&
          booking.longitude <= bounds.longitude[1] &&
          booking.openSeats >= reduxNumGuests
        )
      }

      return (
        booking.latitude >= bounds.latitude[0] &&
        booking.latitude <= bounds.latitude[1] &&
        booking.longitude >= bounds.longitude[0] &&
        booking.longitude <= bounds.longitude[1]
      );
    }
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect to run bookings
  useEffect(() => {
    // this will prevent the terminal to call endpoint on every move of the map.
    if (!hasFetchedBookings) {
      dispatch(fetchChefsBookingsAsync());
      setHasFetchedBookings(true);
    }
  }, [dispatch, viewport, handleRender, hasFetchedBookings]);


  const handleMoveMap = (e) => {

    setViewport({
      ...viewport,
      latitude: e.viewState.latitude,
      longitude: e.viewState.longitude,
      zoom: e.viewState.zoom,
    });

    setBounds({
      latitude: [
        e.target.getBounds().getSouth(),
        e.target.getBounds().getNorth(),
      ],
      longitude: [
        e.target.getBounds().getWest(),
        e.target.getBounds().getEast(),
      ],
    });
  };

  const handleRender = (e) => {

    setBounds({
      latitude: [
        e.target.getBounds().getSouth(),
        e.target.getBounds().getNorth(),
      ],
      longitude: [
        e.target.getBounds().getWest(),
        e.target.getBounds().getEast(),
      ],
    });
  };


  const handleGeo = (e) => {
    console.log("GEO E", e.coords.latitude)
    const userLat = e.coords.latitude;
    const userLng = e.coords.longitude;
    dispatch(setReduxViewport({ ...reduxViewport, latitude: userLat, longitude: userLng }))
    return [userLat, userLng]
  }

  const handleClick = (markerId) => {
    navigate(`/bookings/${markerId}`)
  }

  return (
    // setting up the mapbox container
    <div className="map-page-container">
      <MapSearchBar viewport={viewport} setViewport={setViewport} numGuests={numGuests} setNumGuests={setNumGuests} startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} setFilterStartDate={setFilterStartDate} setFilterEndDate={setFilterEndDate} setFilterNumGuests={setFilterNumGuests} filterStartDate={filterStartDate} filterEndDate={filterEndDate} />

      <div className="map-container">
        <SidebarList user={user} bounds={bounds} selectedMarker={selectedMarker} filteredBookings={filteredBookings} />

        <div className="map-map-container">
          {/* React Map Component to Access the Map */}
          <ReactMapGL
            {...viewport}
            mapStyle={process.env.MAPBOX_STYLE_KEY}
            mapboxAccessToken={process.env.MAPBOX_ACCESS_TOKEN_KEY}
            // this let's us be able to move the map
            onMove={handleMoveMap}
            onRender={handleRender}
          >
            {/* navigation and geolocation control to get location, zoom, etc */}
            <NavigationControl />
            <GeolocateControl onGeolocate={handleGeo} />


            {/* If there are bookings then we want to render the markers on the map */}
            {filteredBookings &&
              filteredBookings.map((booking) => (
                <Marker
                  key={booking.id}
                  longitude={booking.longitude}
                  latitude={booking.latitude}
                >
                  <button
                    className="map-marker-button"
                    onClick={(e) => {
                      e.preventDefault();
                      if (selectedMarker === booking) {
                        setSelectedMarker(null);
                      } else setSelectedMarker(booking);
                    }}
                  >
                    <img
                      className="map-pineapple-image"
                      src="/pineapple.png"
                      alt="pineapple marker"
                    />
                  </button>
                </Marker>
              ))}

            {/* These are actions to be able to handle the popups individually */}
            {selectedMarker ? (
              <Popup
                key={selectedMarker.id}
                longitude={selectedMarker.longitude}
                latitude={selectedMarker.latitude}
                closeButton={true}
                closeOnClick={false}
                onClose={() => setSelectedMarker(null)}
              >
                <div className="map-marker-popup" onClick={() => handleClick(selectedMarker.id)} >
                  <h3>{selectedMarker.title}</h3>
                  <p>{selectedMarker.menu}</p>
                  <p>
                    {selectedMarker.city}, {selectedMarker.state}
                  </p>
                </div>
              </Popup>
            ) : null}
          </ReactMapGL>
        </div>
      </div>
    </div>
  );
};

export default Map;
