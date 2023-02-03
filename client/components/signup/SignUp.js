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
import { useDispatch, useSelector } from "react-redux";
import { authenticate } from "../../store/store";

const SignUp = ({handleOpen}) => {
  const [role, setRole] = useState("");
  console.log("role-->", role);

  // set state for firstName, lastName, bio, mobileNumber, email, password
  const [firstName, setFirstName] = useState("");
  console.log("firstName-->", firstName);

  const [lastName, setLastName] = useState("");
  console.log("lastName-->", lastName);

  const [bio, setBio] = useState("");
  console.log("bio-->", bio);

  const [mobileNumber, setMobileNumber] = useState("");
  console.log("mobileNumber-->", mobileNumber);

  const [email, setEmail] = useState("");
  console.log("email-->", email);

  const [password, setPassword] = useState("");
  console.log("password-->", password);

  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("button clicked!");

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
      handleOpen();
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <form id="signup-signup-form" onSubmit={handleSubmit}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Sign-Up Form
        </Typography>

        <hr />

        <div className="navbar-select-role-container">
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            I would like to be a :
          </Typography>
          <br />

          <div className="navbar-role-selection">
            <FormControl fullWidth >
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
            onChange={(e) => setFirstName(e.target.value)}
            name="firstName"
            value={firstName}
            type="text"
            placeholder="First Name"
            required
          />

          <TextField
            onChange={(e) => setLastName(e.target.value)}
            name="lastName"
            value={lastName}
            type="text"
            placeholder="Last Name"
            required
          />

          <TextField
            onChange={(e) => setBio(e.target.value)}
            name="bio"
            value={bio}
            type="text"
            placeholder="Bio"
          />

          <TextField
            onChange={(e) => setMobileNumber(e.target.value)}
            name="mobileNumber"
            value={mobileNumber}
            type="text"
            placeholder="Mobile Number"
          />

          <TextField
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            value={email}
            type="text"
            placeholder="Email"
          />

          <TextField
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            value={password}
            type="password"
            placeholder="Password"
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
