import React, { useState } from 'react'
import { Button, TextField, Typography, Snackbar, Alert } from '@mui/material';
import { authenticate } from '../../store/store';
import { useDispatch } from 'react-redux';



const SignIn = ({handleOpen}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log("button clicked!")

    setOpen(true)

    dispatch(authenticate({ email, password, method: 'login' }));
  }
  

  const handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <form id='signup-signup-form' onSubmit={handleSubmit}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Log in
        </Typography>
        <hr />
        <div className='navbar-select-role-container'>

          <br />
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
                Log in
              </Button>
            </div>

           

          </div>
        </div>
        <Snackbar open={open} autoHideDuration={30000} onClose={handleSnackClose}>
          <Alert onClose={handleSnackClose} severity="success" sx={{ width: '100%' }}>
            You successfully logged in! 
          </Alert>
        </Snackbar>

      </form>
      <p style={{fontSize: ".7rem"}}>Don't have an account? <Button onClick={()=> handleOpen("signup")}>Sign Up</Button></p>
    </div>
  );
}

export default SignIn