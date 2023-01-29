import React from 'react';

import {Header, Map, Navbar} from '../index';
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
