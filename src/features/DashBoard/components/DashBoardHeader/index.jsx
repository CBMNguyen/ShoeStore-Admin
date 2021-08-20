import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";
import "./dashboardheader.scss";

DashBoardHeader.propTypes = {
  user: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
  employee: PropTypes.array.isRequired,
  products: PropTypes.array.isRequired,
};

function DashBoardHeader(props) {
  const { employee, user, products, total } = props;
  return (
    <Row className="DashBoardHeader">
      <Col md={3}>
        <Link to="/order" className="DashBoardHeader__income shadow">
          <div>
            <header>Total Income</header>
            {<div>{total.toFixed(2)}$</div>}
          </div>
          <div>
            <i className="zmdi zmdi-shopping-cart"></i>
          </div>
        </Link>
      </Col>

      <Col md={3}>
        <Link to="employee" className="DashBoardHeader__employee shadow">
          <div>
            <header>Total Employee</header>
            <div>{employee.length}</div>
            <div></div>
          </div>
          <div>
            <i className="zmdi zmdi-face" />
          </div>
        </Link>
      </Col>

      <Col md={3}>
        <Link to="/user" className="DashBoardHeader__user shadow">
          <div>
            <header>Total User</header>
            <div>{user.length}</div>
            <div></div>
          </div>
          <div>
            <i className="zmdi zmdi-accounts-alt" />
          </div>
        </Link>
      </Col>

      <Col md={3}>
        <Link to="/products" className="DashBoardHeader__product shadow">
          <div>
            <header>Total Product</header>
            <div>{products.length}</div>
            <div></div>
          </div>
          <div>
            <i className="zmdi zmdi-shopping-basket" />
          </div>
        </Link>
      </Col>
    </Row>
  );
}

export default DashBoardHeader;
