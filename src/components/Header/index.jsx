import React, { useState } from "react";
import { Navbar, NavbarToggler, NavbarBrand } from "reactstrap";
import { Link } from "react-router-dom";
import "./header.scss";

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="Header">
      <Navbar light expand="md">
        <div>
          <i className="zmdi zmdi-menu"></i>
        </div>
        <NavbarBrand>
          <Link className="Header__link" to="/">
            Shoes Store
          </Link>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
      </Navbar>
    </div>
  );
};

export default Header;
