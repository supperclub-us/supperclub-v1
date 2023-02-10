import React from 'react';

import {Header, Map, Navbar, Footer} from '../index';
import AppRoutes from './AppRoutes';

const App = () => {
  return (
    <div>
      <Navbar />
      <AppRoutes />
      <Footer />

    </div>
  );
};

export default App;
