import React from "react"


export const Card = ({booking}) => {
    console.log("holaaaa", booking)
    console.log("adios", booking.id)
    
    return (
        <div key={booking.id} className="cards">
            <h5>{booking.title}</h5>
            <p>{booking.menu}</p>
            <img className="food-image" src={booking.imageUrl} />
        </div>
    )
}