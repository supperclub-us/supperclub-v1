import React from "react"
import { Button } from "@mui/material"


export const Card = ({booking}) => {
    console.log("holaaaa", booking)
    console.log("adios", booking.id)
    
    return (
        <div key={booking.id} className="cards">
            <h5>{booking.title}</h5>
            <p className="bookingMenu">{booking.menu}</p>
            <img className="food-image" src={booking.imageUrl} />
        </div>
    )
}

export const ModalCard = ({booking}) => {
    
    
    return (
        <div key={booking.id} className="modal-cards">
            <h5>{booking.title}</h5>
            <p2>{booking.menu}</p2>
            <p style={{padding: "10px"}}> Donation ${booking.suggestedDonation}</p>
            <img className="modalCards" src={booking.imageUrl} />
            <p>Date of Event: {booking.startDateTime} </p>
            <p style={{padding: "10px"}}>End of Event Time: {booking.endDateTime} </p>
            <p style={{padding: "10px"}}>{booking.openSeats} Seats Left </p>
            <Button variant="contained">Book Now</Button>
        </div>
    )
}