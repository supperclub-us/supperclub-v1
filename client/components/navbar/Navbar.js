import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../auth/authSlice';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import './navbar.css';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';

const Navbar = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const [role, setRole] = useState('');
  console.log("role-->", role)

  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate('/login');
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "400px",
    height: "600px",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    // backgroundColor: `#1b202c`,
    // color: `#DFE2EA`,
    borderRadius: 7,
  };

  return (
    <div className='navbar-container'>
      <div className='navbar-left'>
        {/* <img id='logo' src="https://i.imgur.com/q8UzAM2.jpg" /> */}
        <h1>SupperClub</h1>
      </div>

      <div className='navbar-right'>
        <Link className='navbar-link-spacing' to="/home">Home</Link>
        <Link className='navbar-link-spacing' to="/chefs">Chefs</Link>
        <Link className='navbar-link-spacing' to="/cuisine">Cuisine </Link> 

        <Button sx={{marginRight: "25px", backgroundColor: "#EB5757", color: "whitesmoke"}} onClick={handleOpen}>Sign Up</Button>
        <Button sx={{marginRight: "25px", color: "whitesmoke"}} onClick={handleOpen}>Log in</Button>
        
        
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
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
                    <MenuItem value='chef'>Chef</MenuItem>
                    <MenuItem value='member'>Member</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
   
            <div>
              <TextField name='firstName' type="text" placeholder='First Name' />
              <TextField name='lastName' type="text" placeholder='Last Name' />
              <TextField name='bio' type="text" placeholder='Bio' />
              <TextField name='mobileNumber' type="text" placeholder='Mobile Number' />
              <TextField name="email" type="text" placeholder='Email'  />
              <TextField name="password" type="password" placeholder='Password'  />
              <TextField name="address1" type="address1" placeholder='address1'  />
              <TextField name="address2" type="address2" placeholder='address2'  />
              <TextField name="city" type="city" placeholder='city'  />
              <TextField name="state" type="state" placeholder='state'  />
              <TextField name="zipcode" type="zipcode" placeholder='zipcode'  />
              
              <div>
                <Button type="submit" variant="contained" color="primary">
                  Sign Up
                </Button>
              </div>

            </div>


          </Box> 
        </Modal>
      </div>
    </div>
  );
};

export default Navbar;


// return (
//   <div className='navBar'>
//     <div className='navBar-left'>
//       <img id='logo' src="https://i.imgur.com/QpAv4b8.png" />
//       <h1>SupperClub</h1>
//     </div>

//     <nav className='navBar-right'>
//       {isLoggedIn ? (
//         <div>
//           {/* The navbar will show these links after you log in */}
//           <Link to="/home">Home</Link>
//           <button type="button" onClick={logoutAndRedirectHome}>
//             Logout
//           </button>
//         </div>
//       ) : (
//         <div>
//           {/* The navbar will show these links before you log in */}
//           <Link to="/login">Login</Link>
//           <Link to="/signup">Sign Up</Link>
//         </div>
//       )}
//     </nav>
//     <hr />
//   </div>
// );