import React, { useState } from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const firstName = useSelector((state) => state.auth.me.firstName);

  

  return (
    <div>
      <h1>Welcome, {firstName}</h1>
      <h3> Your Dashboard</h3>
      <hr />       
    </div>
  );
};

export default Profile;
