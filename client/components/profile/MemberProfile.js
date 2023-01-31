import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchSingleMember, selectSingleMember } from "../slices/singleMemberSlice"
import { Link } from "react-router-dom"

const MemberProfile = ({ user }) => {
    const { id } = useParams();
    console.log("ID", id);
    const navigate = useNavigate();

    const currentMember = useSelector(selectSingleMember);

    console.log("CHECK ---->", currentMember.id !== user.id);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchSingleMember(user.id));
    }, [dispatch]);

    console.log("this is current member in profile ------>", currentMember);

    


return (
    <>
      
            <div>
                <h1>
                    Welcome {`${currentMember.firstName}`}
                </h1>
                <div>
                    <h3>
                        YOUR UPCOMING EVENTS 
                    </h3>
                </div>
            </div>
            
        
    </>

)

}

export default MemberProfile;