import React, { useState } from 'react'
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';


const SignUp = () => {
    const [role, setRole] = useState('');

  return (
    <div>
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
    </div>
  )
}

export default SignUp