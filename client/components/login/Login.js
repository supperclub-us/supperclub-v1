import React, { useState } from 'react'
import { Button, TextField, Typography } from '@mui/material';


const SignIn = () => {
    

  return (
    <div>
        <Typography id="modal-modal-title" variant="h6" component="h2">
              Sign-In
            </Typography>
            <hr/>
            <div className='navbar-select-role-container'>
             
              <br/>
              <div>
              <TextField name='email' type="text" placeholder='Email' />
              <TextField name='passsword' type="text" placeholder='Password' />
              </div>
            </div>
   
            <div>
                <Button type="submit" variant="contained" color="primary">
                  Sign Up
                </Button>
            </div>
              

           
    </div>
  );
}

export default SignIn