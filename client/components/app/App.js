import React from 'react';

import {Header, Map, Navbar} from '../index';
import AppRoutes from './AppRoutes';

const App = () => {
  return (
    <div>
      <Navbar />
      <AppRoutes />
      <Header />
    </div>
  );
};

export default App;
