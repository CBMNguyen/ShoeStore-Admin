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
  const { employee, user, monthlyIncome } = props;
  return (
    <Row className="DashBoardHeader">
      <Col md={3}>
        <Link to="/order" className="DashBoardHeader__revenue shadow">
          <div>
            <header className="text-uppercase">Total Revenue</header>
            {
              <div>
                $
                {monthlyIncome[0]
                  .reduce((sum, item) => (sum += Number(item)), 0)
                  .toFixed(2)}
              </div>
            }
          </div>
          <div>
            <i className="zmdi zmdi-shopping-cart"></i>
          </div>
        </Link>
      </Col>

      <Col md={3}>
        <Link to="/order" className="DashBoardHeader__income shadow">
          <div>
            <header className="text-uppercase">Total Income</header>
            {
              <div>
                $
                {monthlyIncome[1]
                  .reduce((sum, item) => (sum += Number(item)), 0)
                  .toFixed(2)}
              </div>
            }
          </div>
          <div>
            <i className="zmdi zmdi-money-box"></i>
          </div>
        </Link>
      </Col>

      <Col md={3}>
        <Link to="employee" className="DashBoardHeader__employee shadow">
          <div>
            <header className="text-uppercase">Employees</header>
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
            <header className="text-uppercase">Users</header>
            <div>{user.length}</div>
            <div></div>
          </div>
          <div>
            <i className="zmdi zmdi-accounts-alt" />
          </div>
        </Link>
      </Col>

      {/* <Row className="mt-3">
        <Col md={4}>
          <Link to="employee" className="DashBoardHeader__employee shadow">
            <div>
              <header className="text-uppercase">Total Revenue</header>
              <div>{employee.length}</div>
              <div></div>
            </div>
            <div>
              <i className="zmdi zmdi-money-box"></i>
            </div>
          </Link>
        </Col>

        <Col md={4}>
          <Link to="/products" className="DashBoardHeader__product shadow">
            <div>
              <header className="text-uppercase">Profit</header>
              <div>{products.length}</div>
              <div></div>
            </div>
            <div>
              <i className="zmdi zmdi-card-giftcard"></i>
            </div>
          </Link>
        </Col>
      </Row> */}
    </Row>
  );
}

export default DashBoardHeader;
