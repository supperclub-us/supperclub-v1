import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./confirmation.css";

const ConfirmationPage = () => {
  const user = useSelector((state) => state.auth.me);
  const navigate = useNavigate();
  const [timeRemaining, setTimeRemaining] = useState(6);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(`/users/memberprofile/${user.id}`);
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
    <div className="confirmation-page-container">
      <div className="confirmation-page">
        <h4 className="confirmation-page-sentences">
          {" "}
          Thank you for booking with us, {user.firstName}!{" "}
        </h4>
        <h4 className="confirmation-page-sentences">🎉</h4>
        <h4 className="confirmation-page-sentences">
          {" "}
          Looking forward to sharing a wonderful meal{" "}
        </h4>
        <h4 className="confirmation-page-sentences">🍲</h4>
        <p className="confirmation-page-sentences">
          {" "}
          Navigating back to your dashboard in {timeRemaining}
        </p>
      </div>
    </div>
  );
};

export default ConfirmationPage;
