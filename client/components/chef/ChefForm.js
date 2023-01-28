import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addSingleChefBooking, fetchSingleChefBooking, selectSingleChefBookings } from "../slices/singleChefBookingsSlice";
import { fetchSingleChef, selectSingleChef } from "../slices/singleChefSlice";

import "./chefForm.css";

const states = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "AS",
  "CA",
  "CO",
  "CT",
  "DE",
  "DC",
  "FL",
  "GA",
  "GU",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "CM",
  "OH",
  "OK",
  "OR",
  "PA",
  "PR",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "TT",
  "UT",
  "VT",
  "VA",
  "VI",
  "WA",
  "WV",
  "WI",
  "WY",
];

const ChefForm = () => {
  const userId = useSelector((state) => state.auth.me.id);
  const [title, setTitle] = useState();
  const [menu, setMenu] = useState();
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [max, setMax] = useState();
  const [openSeats, setOpenSeats] = useState();
  const [address1, setAddress1] = useState();
  const [address2, setAddress2] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [zip, setZip] = useState();

 
  const { chefId } = useParams();
  const dispatch = useDispatch();

  const chef = useSelector(selectSingleChefBookings);
  const chefchef = useSelector(selectSingleChef)

  useEffect(() => {
    dispatch(fetchSingleChef(chefId))
    dispatch(fetchSingleChefBooking(chefId));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addSingleChefBooking({chefId, title, menu, start, end, max, openSeats, address1, address2, city, state, zip}))
  };

  // ------ SAMPLE EVENT FORM ---------- //
  /*  
  A Wonderful Mixed Fusion of Cuisine from Chile and China
  -
  We will start with a lovely opening course of xyz. Mid course will be abc and end with some oiuy. This is a bring your own alcohol as well. Recommendations for this meal are a dry red wine.
  -
  Feb 10th at 5:30pm
  -
  Feb 10th at 7:30pm
  -
  238 1/2 E 83rd St
  -
  New York, NY
  -
  10028

  */
  // -------------- END -----------------//

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log({ name, value });

    if (name === "title") setTitle(value);
    if (name === "menu") setMenu(value);
    if (name === "start") setStart(value);
    if (name === "end") setEnd(value);
    if (name === "max") setMax(value);
    if (name === "open") setOpenSeats(value);
    if (name === "address1") setAddress1(value);
    if (name === "address2") setAddress2(value);
    if (name === "city") setCity(value);
    if (name === "state") setState(value);
    if (name === "zip code") setZip(value);
  };

  return (
    <div className="chefEvent-container">
      <h1> Add Event Form </h1>
      <form onSubmit={handleSubmit} className="chefEvent-form">
        <input
          onChange={handleChange}
          type="text"
          placeholder="title of event"
          name="title"
        />
        <textarea
          onChange={handleChange}
          type="text"
          placeholder="menu"
          name="menu"
        />
        <input
          onChange={handleChange}
          type="text"
          placeholder="start date time"
          name="start"
        />
        <input
          onChange={handleChange}
          type="text"
          placeholder="end date time"
          name="end"
        />
        <input
          onChange={handleChange}
          type="text"
          placeholder="max seats"
          name="max seats"
        />
        <input
          onChange={handleChange}
          type="text"
          placeholder="open seats"
          name="open seats"
        />
        <div className="chefEvent-form-address">
          <input
            onChange={handleChange}
            type="text"
            placeholder="address1"
            name="address1"
          />
          <input
            onChange={handleChange}
            type="text"
            placeholder="address2 (...optional)"
            name="address2"
          />
          <input
            onChange={handleChange}
            type="text"
            placeholder="city"
            name="city"
          />
          <input
            onChange={handleChange}
            type="text"
            placeholder="state"
            name="state"
          />
          <input
            onChange={handleChange}
            type="text"
            placeholder="zip code"
            name="zip code"
          />
        </div>

        <button> Add Event </button>
      </form>
    </div>
  );
};

export default ChefForm;
