
  import React, { useState } from 'react';
  import { Button, Modal, TextField } from '@material-ui/core';
  
  const LoginModal = ({ open, handleClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = (evt) => {
      evt.preventDefault();
      // Dispatch action to authenticate user here
      console.log('Email:', email);
      console.log('Password:', password);
      handleClose();
    };
  
    return (
      <Modal open={open} onClose={handleClose}>
        <div>
          <form onSubmit={handleSubmit}>
            <TextField
              name="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(evt) => setEmail(evt.target.value)}
            />
            <TextField
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(evt) => setPassword(evt.target.value)}
            />
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </form>
        </div>
      </Modal>
    );
  };
  
  export default LoginModal;
  