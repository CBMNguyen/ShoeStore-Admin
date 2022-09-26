import { ORDER_STATE } from "constants/globals";
import { fetchOrder } from "features/Order/orderSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import brandLogo from "../../assets/images/brandLogo.png";
import "./sidebar.scss";

const SideBar = (props) => {
  const dispatch = useDispatch();
  const { order: orders } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchOrder());
  }, [dispatch]);

  return (
    <div className="SideBar">
      <ul>
        <header>
          {" "}
          <h2>
            Shoes Store <img src={brandLogo} alt="brandLogo" />
          </h2>{" "}
        </header>
        <li>
          <NavLink className="SideBar__link" to="/dashboard">
            <i className="zmdi zmdi-view-dashboard" />
            <code>DashBoard</code>
          </NavLink>
        </li>
        <li>
          <NavLink
            exact
            className="SideBar__link"
            to="/order"
            activeClassName="active"
          >
            <i className="zmdi zmdi-shopping-cart" />
            <code>Order Management</code>

            <code
              style={{ fontSize: "14px" }}
              className="text-white fw-bold ms-3 px-2 py-1 rounded-2 bg-info"
            >
              {
                orders.filter((order) => order.state === ORDER_STATE.pending)
                  .length
              }
            </code>
          </NavLink>
        </li>
        <li>
          <NavLink className="SideBar__link" to="/products">
            <img
              style={{ width: "20px", position: "relative", left: "-3px" }}
              src={brandLogo}
              alt="brandLogo"
            />
            <code style={{ marginLeft: "12px" }}>Product Management</code>
          </NavLink>
        </li>
        <li>
          <NavLink className="SideBar__link" to="/review">
            <i className="zmdi zmdi-star-outline"></i>
            <code>Review Management</code>
          </NavLink>
        </li>
        <li>
          <NavLink className="SideBar__link" to="/discount">
            <i className="zmdi zmdi-money-box"></i>
            <code>Discount Management</code>
          </NavLink>
        </li>
        <li>
          <NavLink className="SideBar__link" to="/role">
            <i className="zmdi zmdi-device-hub"></i>
            <code>Role Management</code>
          </NavLink>
        </li>
        <li>
          <NavLink className="SideBar__link" to="/user">
            <i className="zmdi zmdi-account" />
            <code style={{ position: "relative", top: "-1px" }}>
              User Management
            </code>
          </NavLink>
        </li>
        <li>
          <NavLink className="SideBar__link" to="/employee">
            <i className="zmdi zmdi-male-female" />
            <code style={{ position: "relative", top: "-1px" }}>
              Employee Management
            </code>
          </NavLink>
        </li>
        <li>
          <NavLink className="SideBar__link" to="/scc">
            <i className="zmdi zmdi-apps" />
            <code style={{ position: "relative", top: "-1px" }}>
              SCCP Management
            </code>
          </NavLink>
        </li>
        <li>
          <NavLink className="SideBar__link" to="/importOrder">
            <i className="zmdi zmdi-assignment-o"></i>
            <code style={{ position: "relative", top: "-1px" }}>
              Import Management
            </code>
          </NavLink>
        </li>
        <li>
          <NavLink className="SideBar__link" to="/supplier">
            <i className="zmdi zmdi-city-alt"></i>
            <code style={{ position: "relative", top: "-1px" }}>
              Supplier Management
            </code>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
