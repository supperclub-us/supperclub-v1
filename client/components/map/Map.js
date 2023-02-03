import React, { useState, useEffect, useRef } from "react";
import ReactMapGL, {
  GeolocateControl,
  NavigationControl,
  Marker,
  Popup,
} from "react-map-gl";
import { useDispatch, useSelector } from "react-redux";
import { fetchChefsBookingsAsync } from "../slices/chefsBookingsSlice";
import MapboxAccessToken, { MapBoxStyle } from "../../env";
import "mapbox-gl/dist/mapbox-gl.css";
import "./map.css";
import { MapSearchBar, SidebarList } from "../index";
// import { setReduxViewport } from "../slices/viewportSlice";
// import { setReduxStartDate, setReduxEndDate, setReduxNumGuests } from "../slices/searchBarFilterSlice";
import mapboxgl from '!mapbox-gl';
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";


const Map = () => {
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

  // LOGS FOR FILTERS
  console.log("FILTERING NUMBER OF GUESTS BOOLEAN --->", filterNumGuests)
  console.log("FILTERING START DATE BOOLEAN --->", filterStartDate)
  console.log("FILTERING END DATE BOOLEAN --->", filterEndDate)
  //-------------------------

  // useState for the bounds which will be how we filter out what is rendered in the sidebar
  const [bounds, setBounds] = useState({
    latitude: [-42.1, -43.26],
    longitude: [72.01, 72.5],
  });

  const [viewport, setViewport] = useState(reduxViewport);

  const rawDate = dayjs().format('MM/DD/YYYY hh:mmA')
  console.log("RAW DATE", rawDate)
  const currentDateTime = rawDate.split(' ');
  const currentDate = currentDateTime[0].split('/');
  // console.log("BOOKING DATE", bookingDate)
  const intCurrentDate = currentDate.map((element) => parseInt(element));
  console.log(" FINAL DATE", intCurrentDate)

  //FILTER LOGIC
  // selecting all bookings that have been created
  const bookings = useSelector((state) => state.chefsBookings);

  // get the current date right now

  const filteredBookings = bookings.filter((booking) => {
    const bookingBooking = booking.startDateTime;
    console.log("BOOKING DATEZ", bookingBooking)
    console.log("DAYJS", dayjs())
    const bookingDateTime = booking.startDateTime.split(' ');
    const bookingDate = bookingDateTime[0].split('/');
    // console.log("BOOKING DATE", bookingDate)
    const intBookingDate = bookingDate.map((element) => parseInt(element));

    console.log("DATES PAST AND FUTURE--->", {currYear: intCurrentDate[2], bookingYr: intBookingDate[2], currMonth: intCurrentDate[0], bookingMonth: intBookingDate[0], currDay: intCurrentDate[1], bookingDay: intBookingDate[1]})
    // console.log(" INTBOOKING DATE", intBookingDate)
    console.log("DAY IS BEFORE TODAY? ----->", dayjs().isBefore(dayjs(`${intBookingDate[2]}-${intBookingDate[0]}-${intBookingDate[1]}`)))
    

    // filter from current date onward
    // return currentDate and onwards
    // *********  2 PAST BOOKINGS NOT SHOWING ********************************************
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
          // console.log("BOOKING OPENSEATS", booking.openSeats);
          // console.log("REDUX NUMGUESTS", reduxNumGuests)
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

  const handleClick = (markerId) => {
    navigate(`/bookings/${markerId}`)
  }

  return (
    // setting up the mapbox container
    <div className="map-page-container">
      <MapSearchBar viewport={viewport} setViewport={setViewport} numGuests={numGuests} setNumGuests={setNumGuests} startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} setFilterStartDate={setFilterStartDate} setFilterEndDate={setFilterEndDate} setFilterNumGuests={setFilterNumGuests} filterStartDate={filterStartDate} filterEndDate={filterEndDate} />

      <div className="map-container">
        <SidebarList bounds={bounds} selectedMarker={selectedMarker} filteredBookings={filteredBookings} />

        <div className="map-map-container">
          {/* React Map Component to Access the Map */}
          <ReactMapGL
            {...viewport}
            mapStyle={MapBoxStyle}
            mapboxAccessToken={MapboxAccessToken}
            // this let's us be able to move the map
            onMove={handleMoveMap}
            onRender={handleRender}
          >
            {/* navigation and geolocation control to get location, zoom, etc */}
            <NavigationControl />
            <GeolocateControl />


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
