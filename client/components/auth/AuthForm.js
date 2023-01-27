import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authenticate } from '../../store/store';
import { Button, TextField, Box } from '@mui/material';

/**
  The AuthForm component can be used for Login or Sign Up.
  Props for Login: name="login", displayName="Login"
  Props for Sign up: name="signup", displayName="Sign Up"
**/

const AuthForm = ({ name, displayName }) => {
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    const email = evt.target.email.value;
    const password = evt.target.password.value;

    console.log("formName-->", formName)
    console.log("email-->", email)
    console.log("password-->", password)

    let role = ""
    let firstName = "" 
    let lastName = ""
    let bio = ""
    let mobileNumber = ""

    if (formName === "signup") {
      role = evt.target.role.value;
      console.log("role-->", role)

      firstName = evt.target.firstName.value;
      console.log("firstName-->", firstName)

      lastName = evt.target.lastName.value;
      console.log("lastName-->", lastName)  

      bio = evt.target.bio.value;
      console.log("bio-->", bio)  

      mobileNumber = evt.target.mobileNumber.value;
      console.log("mobileNumber-->", mobileNumber)  

    }
    dispatch(authenticate({ role, firstName, lastName, bio ,mobileNumber, email, password, method: formName }));

  };

  return (
    <div className='authForm'>
      <form onSubmit={handleSubmit} name={name}>

        {name === "signup" ? (
          <div>
            
            <div>
              <TextField name='role' type="text" placeholder='role'/>
            </div>

            <div>
              <TextField name='firstName' type="text" placeholder='First Name' />
            </div>

            <div>
              <input name='lastName' type="text" placeholder='Last Name' />
            </div>

            <div>
              <TextField name='bio' type="text" placeholder='Bio' />
            </div>

            <div>
              <TextField name='mobileNumber' type="text" placeholder='Mobile Number' />
            </div>

            

          </div>
        ) : null }
        <div>
          <TextField name="email" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div>
          <Button type="submit" variant="contained" color="primary">
          {displayName}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
