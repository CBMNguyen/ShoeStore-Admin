import React from "react";
import { Link } from "react-router-dom";
import "./header.scss";

const Header = (props) => {
  return (
    <div className="Header shadow rounded">
      <div className="Header__title">
        <Link to="/">🧦 Shoes Store</Link>
      </div>
      <div className="Header__admin">
        <div>
          <img
            className="rounded-circle me-2"
            width={38}
            height={38}
            src={process.env.REACT_APP_API_URL + "/uploads/avt.jpg"}
            alt="admin"
          />
        </div>
        <div>Hiếu Nguyễn</div>
      </div>
    </div>
  );
};

export default Header;
