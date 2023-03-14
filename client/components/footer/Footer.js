import React from 'react';
import { Facebook, Instagram, Twitter } from '@mui/icons-material';
import {
  FaCcAmex,
  FaCcDiscover,
  FaCcMastercard,
  FaCcStripe,
  FaCcVisa,
  FaPaypal,
} from 'react-icons/fa';
import { Typography } from '@mui/material';
import './footer.css';

function Footer() {
  return (
    <footer className='footer-container'>
      <div className='footer-row'>
        <div className='footer-column'>
          <Typography variant='body2'>Where to Find Us </Typography>
          <Typography variant='body2'>123 10th Ave </Typography>
          <Typography variant='body2'>New York, NY, USA</Typography>
          <Typography variant='body2'>Tel: 718-123-4567</Typography>
        </div>
        <div className='footer-column'>
          <Typography variant='body2'> Contact Us </Typography>
          <Typography variant='body2'> About Us </Typography>
          <Typography variant='body2'> FAQ </Typography>
          <Typography variant='body2'> Terms of Service </Typography>
        </div>
        <div className='footer-column'>
          <Typography variant='body2'>Follow us!</Typography>
          <Twitter fontSize='medium' />
          <Instagram fontSize='medium' />
          <Facebook fontSize='medium' />
        </div>
      </div>
      <div className='footer-row-payment'>
        <div className='footer-row-cards'>
          <FaPaypal />
          <FaCcVisa />
          <FaCcDiscover />
          <FaCcAmex />
          <FaCcMastercard />
          <FaCcStripe />
        </div>
        <Typography variant='body2'>
          © 2023 Supper Club | All Rights Reserved
        </Typography>
      </div>
    </footer>
  );
}

export default Footer;
