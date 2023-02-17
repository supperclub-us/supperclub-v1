import React from "react";

import { Header, Map, Navbar, Footer } from "../index";
import AppRoutes from "./AppRoutes";
import "./app.css";

const App = () => {
  return (
    <div className="app-container">
      <Navbar />
      <AppRoutes className="app-routes" />
      <Footer />
    </div>
  );
};

export default App;
