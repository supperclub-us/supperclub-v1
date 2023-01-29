import React, { useState } from 'react'
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { authenticate } from '../../store/store';


const SignUp = () => {
    const [role, setRole] = useState('');
    console.log("role-->", role)

    // set state for firstName, lastName, bio, mobileNumber, email, password
    const [firstName, setFirstName] = useState('');
    console.log("firstName-->", firstName)

    const [lastName, setLastName] = useState('');
    console.log("lastName-->", lastName)

    const [bio, setBio] = useState('');
    console.log("bio-->", bio)

    const [mobileNumber, setMobileNumber] = useState('');
    console.log("mobileNumber-->", mobileNumber)

    const [email, setEmail] = useState('');
    console.log("email-->", email)

    const [password, setPassword] = useState('');
    console.log("password-->", password)

    
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault()

        console.log("button clicked!")

        dispatch(authenticate({ role, firstName, lastName, bio ,mobileNumber, email, password, method: "signup" }));
    }

    return (
        <div>
            <form id='signup-signup-form' onSubmit={handleSubmit}> 
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Sign-Up Form
                </Typography>

                <hr/>

                <div className='navbar-select-role-container'>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        I would like to be a :
                    </Typography>
                <br/>

                <div className='navbar-role-selection'>
                    <FormControl fullWidth>
                        <InputLabel>Role </InputLabel>
                        <Select
                            onChange={(e) => setRole(e.target.value)}
                            value={role}
                            label="role"
                        >
                            <MenuItem value='CHEF'>Chef</MenuItem>
                            <MenuItem value='MEMBER'>Member</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                </div>
    
                <div>
                    <TextField 
                        onChange={(e) => setFirstName(e.target.value)} 
                        name='firstName' 
                        value={firstName}
                        type="text" 
                        placeholder='First Name' 
                        required
                    />

                    <TextField 
                        onChange={(e) => setLastName(e.target.value)}
                        name='lastName' 
                        value={lastName}
                        type="text" 
                        placeholder='Last Name' 
                        required
                    />

                    <TextField 
                        onChange={(e) => setBio(e.target.value)}
                        name='bio' 
                        value={bio}
                        type="text" 
                        placeholder='Bio' 
                    />

                    <TextField 
                        onChange={(e) => setMobileNumber(e.target.value)}
                        name='mobileNumber' 
                        value={mobileNumber}
                        type="text" 
                        placeholder='Mobile Number' 
                    />

                    <TextField 
                        onChange={(e) => setEmail(e.target.value)}
                        name="email" 
                        value={email}
                        type="text"
                        placeholder='Email'  
                    />

                    <TextField 
                        onChange={(e) => setPassword(e.target.value)}
                        name="password" 
                        value={password}
                        type="password" 
                        placeholder='Password'  
                    />

                    <div>
                        <Button type="submit" variant="contained" color="primary">
                            Sign Up
                        </Button>
                    </div>
                </div>
            </form>

        </div>
    )
}

export default SignUp