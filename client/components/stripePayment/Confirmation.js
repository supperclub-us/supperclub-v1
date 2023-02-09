import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Confirmation = () => {

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
    <div style={{display: "flex", }}>
      <h1> THANK YOU! 🥳 </h1>
      
    </div>
  );
};

export default Confirmation;
