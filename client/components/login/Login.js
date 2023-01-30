import React, { useState } from 'react'
import { Button, TextField, Typography } from '@mui/material';
import { authenticate } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';


const SignIn = () => {
    const  [email, setEmail] = useState('');
    const  [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const handleSubmit = (event) => {
      event.preventDefault()

      dispatch(authenticate({ email, password, method: 'login' }))
    }

  return (
    <div>
        <form id='signup-signup-form' onSubmit={handleSubmit}> 
          <Typography id="modal-modal-title" variant="h6" component="h2">
              Sign-In
            </Typography>
            <hr/>
            <div className='navbar-select-role-container'>
             
              <br/>
              <div>
              <TextField 
                onChange={(e) => setEmail(e.target.value)}
                name='email'
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
            </div>
              

        </form>   
    </div>
  );
}

export default SignIn