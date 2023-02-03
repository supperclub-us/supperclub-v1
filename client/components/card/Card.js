import React from "react"


export const Card = ({booking}) => {
    console.log("holaaaa", booking)
    console.log("adios", booking.id)
    
    return (
        <div key={booking.id} className="cards">
            <h5>{booking.title}</h5>
            <p2>{booking.menu}</p2>
            <img className="food-image" src={booking.imageUrl} />
        </div>
    )
}

export const ModalCard = ({booking}) => {
    console.log("holaaaa", booking)
    console.log("adios", booking.id)
    
    return (
        <div key={booking.id} className="modal-cards">
            <h5>{booking.title}</h5>
            <p2>{booking.menu}</p2>
            <img className="modalCards" src={booking.imageUrl} />
        </div>
    )
}