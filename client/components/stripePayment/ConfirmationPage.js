import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ConfirmationPage = () => {
    const user = useSelector(state=>state.auth.me)
    const navigate = useNavigate();
    const [timeRemaining, setTimeRemaining] = useState(3);
  
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
    <div style={{width: "100vw", display: "flex", flexDirection: "column", gap: "2rem", justifyContent: "center", alignContent: "center"}}>
        <h3 style={{fontSize: "4rem", fontWeight: "bold"}}> Thank you for booking with us, {user.firstName}! 🎉 </h3>
        <h3 style={{fontSize: "4rem", fontWeight: "bold"}}> Looking forward to sharing a wonderful meal 🍲  </h3>
        <p> Navigating back to your dashboard in {timeRemaining}</p>
    </div>
  )
}

export default ConfirmationPage