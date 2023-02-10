import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ConfirmationPage = () => {
    const user = useSelector(state=>state.auth.me)
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
    <div style={{width: "100vw", display: "flex", flexDirection: "column", gap: "2rem", justifyContent: "center", alignContent: "center"}}>
        <h1 style={{fontSize: "4rem", fontWeight: "bold"}}> THANK FOR YOU {user.firstName} for booking! 🎉 </h1>
        <p> Navigating back to home page in {timeRemaining}</p>
    </div>
  )
}

export default ConfirmationPage