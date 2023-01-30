import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../auth/authSlice';
import { Button, Typography, Modal, Box } from '@mui/material';
import './navbar.css';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { SignUp, Login } from '../index';


const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [modalScreen, setModalScreen] = useState("");

  const handleOpen = (str) => {
    setModalScreen(str);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const renderModalScreen = () => {
    if (modalScreen === "signup") {
      return <SignUp />;
    }

    if (modalScreen === "login") {
        return <Login />;
    }
    return <p>default</p>;
  }
  
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate('/');
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
    borderRadius: 7,
  };

  return (
    <div className='navbar-container'>

      <div className='navbar-left'>
        <h1>SupperClub</h1>
      </div>

      <div className='navbar-right'>
        <Link className='navbar-link-spacing' to="/home">Home</Link>
        <Link className='navbar-link-spacing' to="/chefs">Chefs</Link>
        <Link className='navbar-link-spacing' to="/cuisines">Cuisines</Link> 

        {isLoggedIn ? (
          <>
            <Link className='navbar-link-spacing' to="/users/profile">Profile </Link> 
            <Button type="button" onClick={logoutAndRedirectHome}>
              Log out
            </Button>
          </>
          )
          
          :

          (<>
            <Button sx={{marginRight: "25px", backgroundColor: "#EB5757", color: "whitesmoke"}} onClick={ () => handleOpen("signup")}>Sign Up</Button>
            <Button sx={{marginRight: "25px", color: "whitesmoke"}} onClick={ () => handleOpen("login")}>Log in</Button>
          </>)

        }
        
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>{renderModalScreen()}</Box> 
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
// 