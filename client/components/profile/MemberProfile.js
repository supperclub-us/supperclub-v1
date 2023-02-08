import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchSingleMember,
  selectSingleMember,
} from "../slices/singleMemberSlice";
import { LinearProgress, Button, Skeleton, Box } from "@mui/material";
import { PageNotFound } from "../";
import { Card } from "./card/Card";

const MemberProfile = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentMember, isLoading } = useSelector(selectSingleMember);

  useEffect(() => {
    dispatch(fetchSingleMember(user.id));
  }, [dispatch, user]);

  if (isLoading || !currentMember) {
    return (
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Skeleton />
        <Skeleton animation="wave" />
        <Skeleton animation={false} />
      </Box>
    );
  }

  return (
    <div className="links">
      <h1>{`Welcome, ${currentMember.firstName}!`}</h1>
      <h3> Your Dashboard</h3>
      <hr />
      <h3>YOUR UPCOMING SUPPERS</h3>
      <div className="profileContainer">
        {currentMember && currentMember.memberBooking?.length
          ? currentMember.memberBooking.map((booking) => (
              <Card
                key={booking.id}
                booking={booking}
                currentMember={currentMember}
              />
            ))
          : "No Events"}
      </div>
    </div>
  );
};

export default MemberProfile;
