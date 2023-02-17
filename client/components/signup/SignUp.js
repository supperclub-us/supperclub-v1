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
import "./signUp.css";
import { margin } from "@mui/system";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";

const SignUp = ({ handleOpen }) => {
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
    <div className="signup-container">
      <form id="signup-signup-form" onSubmit={handleSubmit}>
        <Typography id="signup-form-title" variant="h6">
          Sign Up Form
        </Typography>

        <div className="signup-role-selection">
          <FormControl className="signup-role">
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

        <div className="signup-first-name-and-last-name-container">
          <TextField
            onChange={(e) => setFirstName(e.target.value)}
            name="firstName"
            value={firstName}
            type="text"
            placeholder="First Name"
            label="First Name"
            required
          />
          <TextField
            onChange={(e) => setLastName(e.target.value)}
            name="lastName"
            value={lastName}
            type="text"
            placeholder="Last Name"
            label="Last Name"
            required
          />
        </div>

        <div className="signup-bio-container">
          <TextField
            onChange={(e) => setBio(e.target.value)}
            name="bio"
            multiline
            rows={5}
            value={bio}
            type="text"
            placeholder="Biography"
            label="Biography"
          />
        </div>

        <TextField
          onChange={(e) => setMobileNumber(e.target.value)}
          name="mobileNumber"
          value={mobileNumber}
          type="text"
          placeholder="Mobile Number"
          label="Mobile Number"
        />

        <TextField
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="text"
          placeholder="Email"
          label="Email"
        />

        <TextField
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          placeholder="Password"
          label="Password"
        />

        <div id="signup-button">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              "&:hover": { backgroundColor: "#EB5757", color: "whitesmoke" },
              backgroundColor: "#EB5757",
              color: "whitesmoke",
            }}
            startIcon={<EmojiEmotionsIcon />}
          >
            Sign Up
          </Button>
          <p className="signup-to-login-question">
            Already have an account?
            <Button
              onClick={() => handleOpen("login")}
              sx={{
                "&:hover": { backgroundColor: "whitesmoke", color: "#EB5757" },
                color: "#EB5757",
                fontSize: "12px",
              }}
              variant="text"
            >
              Login
            </Button>
          </p>
        </div>

        {/* need to make error handling for the snackbar, as it stands this message will pop up with all log in attempts even unauth or wrong inputs */}
        <Snackbar
          open={open}
          autoHideDuration={10000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            You signed up!
          </Alert>
        </Snackbar>
      </form>
    </div>
  );
};

export default SignUp;
