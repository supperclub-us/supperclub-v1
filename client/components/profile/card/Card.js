import React from "react";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


export const Card = ({booking}) => {
    const navigate = useNavigate();

    const user = useSelector((state) => state.auth.me);
 
    const handleClick = () => {
        navigate(`/bookings/${booking.id}`)
      }

    return (
        <div key={booking.id} className="cards">
            <h5>{booking.title}</h5>
            <p className="bookingMenu">{booking.menu}</p>
            <img className="food-image" src={booking.imageUrl} />
            {user.role === "CHEF" && (
                <Button
                    variant="contained"
                    startIcon={<EditIcon />}
                    onClick={ () => { navigate(`/users/chefs/${booking.chefId}/bookings/${booking.id}`)}}
                >
                    Edit Event
                </Button>
            )}

            {user.role === "MEMBER" && (
                <Button onClick={handleClick} variant="contained">View Details</Button>

            )}

        </div>
    )
}

export const ModalCard = ({booking}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        console.log("chefs booking clicked!!!")
        navigate(`/bookings/${booking.id}`)
      }

    return (
        <div key={booking.id} className="modal-cards">
            <h5>{booking.title}</h5>
            <p>{booking.menu}</p>
            <p style={{padding: "10px"}}> Donation ${booking.suggestedDonation}</p>
            <img className="modalCards" src={booking.imageUrl} />
            <p>Date of Event: {booking.startDateTime} </p>
            <p style={{padding: "10px"}}>End of Event Time: {booking.endDateTime} </p>
            <p style={{padding: "10px"}}>{booking.openSeats} Seats Left </p>
            <Button onClick={handleClick} variant="contained">View Details</Button>
        </div>
    )
}
