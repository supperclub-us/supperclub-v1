import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./pageNotFound.css";

const PageNotFound = () => {
  const navigate = useNavigate();
  const [timeRemaining, setTimeRemaining] = useState(3);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home");
    }, timeRemaining * 1000);
    return () => clearTimeout(timer);
  }, [navigate, timeRemaining]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pageNoteFound-container">
      <h1 className="pageNotFound-404">
        {" "}
        <strong>404</strong>{" "}
      </h1>
      <div>
        <h2>Oops! You seem to be lost.</h2>
        <h2> You will be navigated back home in {timeRemaining} seconds!</h2>
        {/* <Link to="/">
        <img src="https://i.imgur.com/gxL6GG0.png" />
      </Link> */}
      </div>
    </div>
  );
};

export default PageNotFound;
