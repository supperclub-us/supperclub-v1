import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {
    const firstName = useSelector(state => state.auth.me.firstName)   
    
    return (
        <div>
            <h1>Profile</h1>
            <p>Welcome, {firstName}</p>
        </div>
    )
}

export default Profile