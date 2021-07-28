import React from "react";
import { NavLink } from "react-router-dom";
import "./sidebar.scss";

const SideBar = (props) => {
  return (
    <div className="SideBar">
      <ul>
        <header>🧦 Shoes Store</header>
        <li>
          <NavLink className="SideBar__link" to="/dashboard">
            <i className="zmdi zmdi-view-dashboard" />
            DashBoard
          </NavLink>
        </li>
        <li>
          <NavLink className="SideBar__link" to="/user">
            <i className="zmdi zmdi-account" />
            User
          </NavLink>
        </li>
        <li>
          <NavLink className="SideBar__link" to="/employee">
            <i className="zmdi zmdi-male-female" />
            Employees
          </NavLink>
        </li>
        <li>
          <NavLink className="SideBar__link" to="/scc">
            <i className="zmdi zmdi-apps" />
            SCCP
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
    </div>
  );
};

export default SideBar;
