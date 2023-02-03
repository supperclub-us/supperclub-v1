import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchSingleMember, selectSingleMember } from "../slices/singleMemberSlice"
import { LinearProgress, Button } from "@mui/material";
import { PageNotFound } from "../"

const MemberProfile = ({ user }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { currentMember, isLoading, error } = useSelector(selectSingleMember);

    useEffect(() => {
        dispatch(fetchSingleMember(user.id));
    }, [dispatch]);

    
    if (isLoading) {
        return <LinearProgress />;
    }

    if (error) {
        return <PageNotFound />;
    }

    // if (!currentMember) {
    //   return <PageNotFound />;
    // }

    if (user.id !== Number(id)) {
        return <PageNotFound />;
    }

    return (
        <>
            <div className="links">
                <h1>
                    {`Welcome, ${currentMember.firstName}!`}
                </h1>
                <h3> Your Dashboard</h3>
                <hr />
                {/* <Button variant="outlined" onClick={() => { window.location.href = `/chefs/${currentChef.id}/event` }}>Create an Event</Button> */}
                <h3>YOUR UPCOMING SUPPERS</h3>
                <div className="profileContainer">
                    {currentMember && currentMember.memberBooking?.length
                        ? currentMember.memberBooking.map((booking) => (
                            <div key={booking.id} className="cards">
                                <h5>{booking.title}</h5>
                                <p>{booking.menu}</p>
                            </div>
                        ))
                        : "No Events"}
                </div>
            </div>

            {/* <div>
                <h1>
                    Welcome {`${currentMember.firstName}`}
                </h1>
                <div>
                    <h3>
                        YOUR UPCOMING EVENTS
                    </h3>
                </div>
            </div> */}
        </>

    )

}

export default MemberProfile;
