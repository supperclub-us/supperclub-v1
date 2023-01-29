import React from 'react';

import {Header, Map, Navbar, SignIn} from '../index';
import AppRoutes from './AppRoutes';

const App = () => {
  return (
    <div>
      <Navbar element={<SignIn/>} />
      
      <AppRoutes />
      <Header />
      <Map />
    </div>
  );
};

export default App;
