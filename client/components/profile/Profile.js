import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchSingleChef, selectSingleChef } from "../slices/singleChefSlice";

const Profile = ({ user }) => {
  const { id } = useParams();
  console.log("ID", id);
  const navigate = useNavigate();

  const currentChef = useSelector(selectSingleChef);

  console.log("CHECK --->", currentChef.id !== user.id);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSingleChef(user.id));
  }, [dispatch]);

  console.log("this is current chef in profile ---->", currentChef);


  return (
    <>
      {currentChef.id !== user.id ? (
        navigate("/pageNotFound")
      ) : (
        <div>
          <h1>
            Welcome
            {currentChef.role === "CHEF"
              ? ` Chef ${currentChef.firstName}`
              : currentChef.firstName}
          </h1>
          <h3> Your Dashboard</h3>
          <hr />
          <div>
            <h3>YOUR EVENTS</h3>
            {currentChef && currentChef.chefBooking?.length ? currentChef.chefBooking.map((booking)=>(
              <div key={booking.id}>
                <h5>{booking.title}</h5>
                <p>{booking.menu}</p>
              </div>
            )) : "No Events"}
          </div>
          <div>CREATE AN EVENT</div>
        </div>
      )}
    </>
  );
};

export default Profile;
