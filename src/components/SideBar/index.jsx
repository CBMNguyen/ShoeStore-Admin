import React from "react";
import { Nav, NavItem } from "reactstrap";
import { NavLink } from "react-router-dom";
import "./sidebar.scss";

const SideBar = (props) => {
  return (
    <div className="SideBar">
      <Nav className="flex-column">
        <NavItem>
          <div className="SideBar__title">
            <i className="zmdi zmdi-settings" /> Manage
          </div>
          <ul className="SideBar__manage">
            <li>
              <NavLink className="SideBar__link" to="/user">
                <i className="zmdi zmdi-account" />
                User
              </NavLink>
            </li>
            <li>
              <NavLink className="SideBar__link" to="/employee">
                <i className="zmdi zmdi-account-box-o" />
                Employees
              </NavLink>
            </li>
            <li>
              <NavLink className="SideBar__link" to="/category">
                <i className="zmdi zmdi-apps" />
                Category
              </NavLink>
            </li>
            <li>
              <NavLink className="SideBar__link" to="/products">
                <i className="zmdi zmdi-store" />
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
                className="SideBar__link"
                to="/cart"
                activeClassName="active"
              >
                <i className="zmdi zmdi-shopping-cart" />
                Order
              </NavLink>
            </li>
          </ul>
          <hr />
        </NavItem>
      </Nav>
    </div>
  );
};

export default SideBar;
