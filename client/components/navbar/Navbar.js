import React, { useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../auth/authSlice";
import { Button, Typography, Modal, Box } from "@mui/material";
import "./navbar.css";
import ClearIcon from '@mui/icons-material/Clear'
import LogoutIcon from '@mui/icons-material/Logout';
import { SignUp, Login } from "../index";
import LoginIcon from '@mui/icons-material/Login';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import HomeIcon from '@mui/icons-material/Home';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [modalScreen, setModalScreen] = useState("");

  const isLoggedIn = useSelector((state) => !!state.auth.me.id);

  const user = useSelector((state) => state.auth.me);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpen = (str) => {
    setModalScreen(str);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setModalScreen("");

    user.role === "CHEF" ? navigate(`/users/chefprofile/${user.id}`) : null
  };

  const renderModalScreen = () => {
    if (modalScreen === "signup") {
      return <SignUp handleOpen={handleOpen} />;
    }

    if (modalScreen === "login") {
      return <Login handleOpen={handleOpen} />;
    }

  };

  const handleNavToProfile = () => {
    if (user.role === "CHEF") {
      navigate(`/users/chefprofile/${user.id}`);
    } else {
      navigate(`/users/memberprofile/${user.id}`);
    }
  };

  const handleNavToChefs = () => {
    navigate(`/chefs`);
  }

  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate("/");
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "400px",
    height: "600px",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: 7,
  };

  return (
    <div className="navbar-container">
      <div className="navbar-left">
        <h1 className="navbar-supper-club-name">
          <Link id="link-logo" to="/">
            {/* <img src="https://i.imgur.com/wl0Y3tL.png" id="logo"/> */}
            <h3 id="name">supperclub</h3>
          </Link>

        </h1>
      </div>

      <div className="navbar-right">
        {/* <Link className="navbar-link-spacing" to="/home">
          Home
        </Link> */}

        <Button
          type="button"
          onClick={() => navigate("/home")}
          startIcon={<HomeIcon />}
          sx={{ marginRight: "25px", color: "whitesmoke" }}

        >
          Home
        </Button>
        {user.role === "CHEF" ? null : 
            <Button
              type="button"
              onClick={handleNavToChefs}
              startIcon={<RestaurantIcon />}
              sx={{ marginRight: "25px", color: "whitesmoke" }}

            >
              Chefs
            </Button> 
              

            // <Link className="navbar-link-spacing" to="/chefs">
            //   Chefs
            // </Link>
            
        }

        {isLoggedIn ? (
          <>
            {/* {user.role === "CHEF" ? (
              <Link
                className="navbar-link-spacing"
                to={`/users/chefprofile/${user.id}`}
              >
                Profile
              </Link> ) : (
              <Link
                className="navbar-link-spacing"
                to={`/users/memberprofile/${user.id}`}
              >
                Profile
              </Link> )} */}

            <Button
              type="button"
              onClick={handleNavToProfile}
              startIcon={<AccountCircleIcon />}
              sx={{ marginRight: "25px", color: "whitesmoke" }}
            >
              Profile
            </Button>

            <Button 
              type="button" 
              onClick={logoutAndRedirectHome} 
              sx={{ marginRight: "25px", color: "whitesmoke" }}
              startIcon={<LogoutIcon />}
            >
              Log out
            </Button>
          </>
        ) : (
          <>
            <Button
              sx={{
                marginRight: "25px",
                "&:hover": { backgroundColor: "#EB5757", color: "whitesmoke" },
                backgroundColor: "#EB5757",
                color: "whitesmoke",
              }}
              onClick={() => handleOpen("signup")}
              
            >
              Sign Up
            </Button>
            <Button
              sx={{ marginRight: "25px", color: "whitesmoke" }}
              onClick={() => handleOpen("login")}
              startIcon={<LoginIcon />}

            >
              Log in
            </Button>
          </>
        )}

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>{renderModalScreen()}
          <Button
            onClick={handleClose}
            startIcon={<ClearIcon />}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
            }}>
          </Button>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Navbar;
