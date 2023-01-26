import React from 'react';
import { useSelector } from 'react-redux';

/**
 * COMPONENT
 */
const Home = (props) => {
  const email = useSelector((state) => state.auth.me.email);

  return (
    <div>
      <h3>Welcome, {email}</h3>
    </div>
  );
};

export default Home;
