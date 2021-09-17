import moment from "moment";
import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { Table } from "reactstrap";
import { capitalizeFirstLetter, orderPriceTotal } from "utils/common";
import "./recentsaletable.scss";

RecentSaleTable.propTypes = {
  order: PropTypes.array.isRequired,
};

function RecentSaleTable(props) {
  const { order } = props;

  const sortOrderByDate = order.slice().sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  }).slice(0, 7);

  return (
    <div className="RecentSaleTable shadow">
      <header className="d-flex justify-content-between">
        <div>Recent Sales</div>
        <div>
          {" "}
          <Link to="/order">See All</Link>
        </div>
      </header>

      <Table size="sm" borderless>
        <thead>
          <tr>
            <th>Time</th>
            <th>Customer</th>
            <th>Sales</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody>
          {sortOrderByDate.slice(0, 7).map((od) => (
            <tr key={od._id}>
              <td>{moment(new Date(od.createdAt), "YYYYMMDD").fromNow()}</td>
              <td>{`${od.user.firstname} ${od.user.lastname}`}</td>
              <td>{capitalizeFirstLetter(od.state)}</td>
              <td>{orderPriceTotal(od)}$</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default RecentSaleTable;
