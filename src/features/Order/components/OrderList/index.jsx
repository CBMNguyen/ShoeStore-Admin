import PropTypes from "prop-types";
import React from "react";
import { Table } from "reactstrap";
import OrderItem from "../OrderItem";

OrderList.propTypes = {
  order: PropTypes.array.isRequired,
  showModel: PropTypes.func.isRequired,
};

function OrderList(props) {
  const { order, showModel } = props;
  return (
    <div className="OrderList">
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>User</th>
            <th>Time</th>
            <th>Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {order.map((od, index) => {
            // total price of products
            const total = od.products.reduce(
              (sum, product) =>
                sum +
                product.originalPrice *
                  product.selectedQuantity *
                  (1 - product.promotionPercent),
              0
            );

            return (
              <OrderItem
                key={od._id}
                index={index}
                item={od}
                total={total}
                showModel={showModel}
              />
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default OrderList;
