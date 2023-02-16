import React, { useState } from 'react'
import { Button, TextField, Typography, Snackbar, Alert } from '@mui/material';
import { authenticate } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import './login.css';


const SignIn = ({handleOpen}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault()

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
    <div className="login-form-container">
      <form id='login-form' onSubmit={handleSubmit}>
        <Typography id="login-form-title" variant="h5">
          Log In
        </Typography>

        <div className='login-email-and-password'>
          <div className='login-email'>
            <TextField
              onChange={(e) => setEmail(e.target.value)}
              name='email'
              value={email}
              type="text"
              placeholder='Email'
            />
          </div>

          <div className='login-password'>
            <TextField
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                value={password}
                type="password"
                placeholder='Password'
            />
          </div>


            <div id="login-button">
              <Button 
                type="submit" 
                variant="contained" 
                color="primary"
                startIcon={<LoginIcon />}
                sx={{
                  "&:hover": { backgroundColor: "#EB5757", color: "whitesmoke" },
                  backgroundColor: "#EB5757",
                  color: "whitesmoke",
                }}
              >
                Log in
              </Button>
            </div>
        </div>
        <Snackbar
          open={open} 
          autoHideDuration={30000} 
          onClose={handleSnackClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}

        >
          <Alert onClose={handleSnackClose} severity="success" sx={{ width: '100%' }}>
            You logged in!
          </Alert>
        </Snackbar>

      </form>
      <p className="login-to-sign-question">Don't have an account? <Button onClick={()=> handleOpen("signup")}>Sign Up</Button></p>
    </div>
  );
}

export default SignIn
