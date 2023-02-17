import React from "react";
import { SearchBar } from "../index";
import { useSelector } from "react-redux";

const Header = () => {
  const user = useSelector((state) => state.auth.me);

  return user.role === "CHEF" ? null : <SearchBar />;
};

export default Header;
