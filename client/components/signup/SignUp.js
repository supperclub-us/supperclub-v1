import React, { useState } from "react";
import {
  Alert,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { authenticate } from "../../store/store";
import "./signUp.css";

const SignUp = ({handleOpen}) => {
  const [role, setRole] = useState("");

  // set state for firstName, lastName, bio, mobileNumber, email, password
  const [firstName, setFirstName] = useState("");

  const [lastName, setLastName] = useState("");

  const [bio, setBio] = useState("");

  const [mobileNumber, setMobileNumber] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    setOpen(true);

    dispatch(
      authenticate({
        role,
        firstName,
        lastName,
        bio,
        mobileNumber,
        email,
        password,
        method: "signup",
      })
    );
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div className="signup-form-container">
      <form id="signup-signup-form" onSubmit={handleSubmit}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Sign-Up Form
        </Typography>

        <hr />

        <div className="navbar-role-selection">
          
          <br />

          <div className="navbar-role-selection">
             <FormControl style={{ width: 197, mt: 10 }} fullWidth>
              <InputLabel>Role </InputLabel>
              <Select
                onChange={(e) => setRole(e.target.value)}
                value={role}
                label="role"
              >
                <MenuItem value="CHEF">Chef</MenuItem>
                <MenuItem value="MEMBER">Member</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>

        <div>
          <TextField
            className="in"  style={{ marginTop: '10px' }}
            onChange={(e) => setFirstName(e.target.value)}
            name="firstName"
            value={firstName}
            type="text"
            placeholder="First Name"
            label="First Name"
            required
          />

          <TextField
            className="in"  style={{ marginTop: '10px' }}
            onChange={(e) => setLastName(e.target.value)}
            name="lastName"
            value={lastName}
            type="text"
            placeholder="Last Name"
            label="Last Name"
            required
          />

          <TextField
            className="in"  style={{ marginTop: '10px' }}
            onChange={(e) => setBio(e.target.value)}
            name="bio"
            value={bio}
            type="text"
            placeholder="Biography"
            label="Biography"
          />

          <TextField
            className="in"  style={{ marginTop: '10px' }}
            onChange={(e) => setMobileNumber(e.target.value)}
            name="mobileNumber"
            value={mobileNumber}
            type="text"
            placeholder="Mobile Number"
            label="Mobile Number"
          />

          <TextField
            className="info" style={{ marginTop: '30px' }}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="text"
            placeholder="Email"
            label="Email"
          />

          <TextField 
          className="in"  style={{ marginTop: '10px' }}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
            label="Password"
          />

          <div>
            <Button type="submit" variant="contained" color="primary">
              Sign Up
            </Button>
          </div>
        </div>
        {/* need to make error handling for the snackbar, as it stands this message will pop up with all log in attempts even unauth or wrong inputs */}
        <Snackbar open={open} autoHideDuration={10000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            You successfully signed up!
          </Alert>
        </Snackbar>
      </form>
      <p style={{fontSize: ".7rem"}}>
        Already have an account?
        <Button onClick={() => handleOpen("login")}>Login</Button>
      </p>
    </div>
  );
};

export default SignUp;
