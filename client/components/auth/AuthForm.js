import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authenticate } from '../../store/store';
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

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

    let role = ""
    let firstName = ""
    let lastName = ""
    let bio = ""
    let mobileNumber = ""

    if (formName === "signup") {
      role = evt.target.role.value;
      firstName = evt.target.firstName.value;
      lastName = evt.target.lastName.value;
      bio = evt.target.bio.value;
      mobileNumber = evt.target.mobileNumber.value
    }
    dispatch(authenticate({ role, firstName, lastName, bio ,mobileNumber, email, password, method: formName }));

  };

  return (
    <div className='authForm'>
      <form onSubmit={handleSubmit} name={name}>

        {name === "signup" ? (
          <div>

            <div>
              <label htmlFor='role'>
                <small>role</small>
              </label>
              <TextField name='role' type="text" placeholder='role'/>
            </div>

            <div>
              <label htmlFor='firstName'>
                <small>first name</small>
              </label>
              <input name='firstName' type="text" placeholder='First Name' />
            </div>

            <div>
              <label htmlFor='lastName'>
                <small>last name</small>
              </label>
              <input name='lastName' type="text" placeholder='Last Name' />
            </div>

            <div>
              <label htmlFor='bio'>
                <small>bio</small>
              </label>
              <input name='bio' type="text" placeholder='Bio' />
            </div>

            <div>
              <label htmlFor='mobileNumber'>
                <small>mobile number</small>
              </label>
              <input name='mobileNumber' type="text" placeholder='Mobile Number' />
            </div>



          </div>
        ) : null }
        <div>
          <label htmlFor="email">
            <small>email</small>
          </label>
          <input name="email" type="text" />
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
