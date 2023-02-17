import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../auth/authSlice";
import { Button, Modal, Box } from "@mui/material";
import "./navbar.css";
import ClearIcon from "@mui/icons-material/Clear";
import LogoutIcon from "@mui/icons-material/Logout";
import { SignUp, Login } from "../index";
import LoginIcon from "@mui/icons-material/Login";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import HomeIcon from "@mui/icons-material/Home";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import SmallMenu from "./SmallMenu";

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

    user.role === "CHEF" ? navigate(`/users/chefprofile/${user.id}`) : null;
  };

  const renderModalScreen = () => {
    if (modalScreen === "signup") {
      return <SignUp handleOpen={handleOpen} />;
    }

    if (modalScreen === "login") {
      return <Login handleOpen={handleOpen} />;
    }
  };

  // State to track the scroll position
  const [scrollTop, setScrollTop] = useState(0);

  // Handle the scroll event
  const handleScroll = () => {
    setScrollTop(window.pageYOffset || document.documentElement.scrollTop);
  };

  // Add the scroll event listener on mount
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      // Remove the scroll event listener on unmount
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Determine the opacity based on the scroll position
  const opacity = Math.max(0, 1 - (scrollTop - 50) / 100);

  const handleNavToProfile = (e) => {
    e.preventDefault();
    if (user.role === "CHEF") {
      navigate(`/users/chefprofile/${user.id}`);
    } else {
      navigate(`/users/memberprofile/${user.id}`);
    }
  };

  const handleNavToChefs = () => {
    navigate(`/chefs`);
  };

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
    maxHeight: "600px",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: "12px",
  };

  return (
    <div
      className="navbar-container"
      style={{
        opacity,
      }}
    >
      <div className="navbar-left">
        <img
          className="navbar-logo"
          src={"/supperclub-logo.png"}
          alt="supperclub logo"
        />
        <h1 className="navbar-supper-club-name">
          <Link id="link-logo" to="/">
            <h3 id="name">supperclub</h3>
          </Link>
        </h1>
      </div>

      <div className="navbar-right">
        <div className="navbar-largeScreen">
          <Button
            type="button"
            onClick={() => navigate("/home")}
            startIcon={<HomeIcon />}
            sx={{ marginRight: "25px", color: "whitesmoke" }}
          >
            Home
          </Button>
          {user.role === "CHEF" ? null : (
            <Button
              type="button"
              onClick={handleNavToChefs}
              startIcon={<RestaurantIcon />}
              sx={{ marginRight: "25px", color: "whitesmoke" }}
            >
              Chefs
            </Button>
          )}

          {isLoggedIn ? (
            <>
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
                  "&:hover": {
                    backgroundColor: "#EB5757",
                    color: "whitesmoke",
                  },
                  backgroundColor: "#EB5757",
                  color: "whitesmoke",
                }}
                onClick={() => handleOpen("signup")}
                startIcon={<EmojiEmotionsIcon />}
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
        </div>
        <div className="navbar-smallScreen">
          <SmallMenu
            user={user}
            isLoggedIn={isLoggedIn}
            logoutAndRedirectHome={logoutAndRedirectHome}
            handleOpen={handleOpen}
          />
        </div>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {renderModalScreen()}
            <Button
              onClick={handleClose}
              startIcon={<ClearIcon sx={{ color: "#EB5757" }} />}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
              }}
            ></Button>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Navbar;
