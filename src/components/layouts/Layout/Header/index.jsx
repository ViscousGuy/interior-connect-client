import React from "react";
import Nav from "./Nav";


const Header = ({ handleShow }) => {
  return (
    <header>
      <Nav handleShow={handleShow} />
    </header>
  );
};

export default Header;
