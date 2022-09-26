import PropTypes from "prop-types";
import { Table } from "reactstrap";
import OrderItem from "../OrderItem";

OrderList.propTypes = {
  order: PropTypes.array.isRequired,
};

function OrderList(props) {
  const { order, toggle, setSelectedOrder } = props;
  return (
    <div className="OrderList">
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>User</th>
            <th>Time</th>
            <th>Total</th>
            <th>P.Method</th>
            <th>Payment</th>
            <th>Employee</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {order.map((od, index) => {
            return (
              <OrderItem
                key={od._id}
                index={index}
                item={od}
                toggle={toggle}
                setSelectedOrder={setSelectedOrder}
              />
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default OrderList;
