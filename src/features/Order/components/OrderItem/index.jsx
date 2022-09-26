import classNames from "classnames";
import moment from "moment";
import PropTypes from "prop-types";
import React from "react";
import { Badge } from "reactstrap";
import { capitalizeFirstLetter } from "utils/common";
import "./orderitem.scss";
import momoImage from "../../../../assets/images/MoMo_Logo.png";
import deliveredLogo from "../../../../assets/images/delivery-logo.png";

OrderItem.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  showModel: PropTypes.func,
};

OrderItem.defaultProps = {
  showModel: null,
};

function OrderItem(props) {
  const { item, index, toggle, setSelectedOrder } = props;

  const handleViewClick = (data) => {
    if (!toggle || !setSelectedOrder) return;
    setSelectedOrder(data);
    toggle();
  };

  return (
    <tr className="OrderItem">
      <td>{index + 1}</td>

      <td>
        <div className="OrderItem__person">
          {item.user.image && (
            <img
              className="rounded-circle OrderItem__avatar shadow border-1"
              src={item.user.image}
              alt={item.user._id}
              width={40}
              height={40}
            />
          )}
          {!item.user.image && (
            <div
              style={{ width: "40px", height: "40px", backgroundColor: "#000" }}
              className="d-flex align-items-center justify-content-center rounded-circle text-white shadow border-1"
            >
              {item.user.firstname[0]}
            </div>
          )}
          <code className="text-dark fw-bold ms-2">{`${item.user.firstname} ${item.user.lastname}`}</code>
        </div>
      </td>

      {/* format date */}

      <td>
        <Badge className="bg-dark">
          {moment(new Date(item.createdAt), "YYYYMMDD").fromNow()}
        </Badge>
      </td>

      <td>
        <Badge className="bg-warning">${item.total.toFixed(2)}</Badge>
      </td>

      <td>
        {item.paymentMethod ? (
          <img
            src={momoImage}
            className="OrderItem__avatar ms-4 rounded"
            width={28}
            height={28}
            alt="momoLogo"
          />
        ) : (
          <img
            src={deliveredLogo}
            className="OrderItem__avatar ms-2"
            width={40}
            height={28}
            alt="momoLogo"
          />
        )}
      </td>

      <td>
        {item.payment ? (
          <i className="zmdi zmdi-check text-success ms-4"></i>
        ) : (
          <i className="zmdi zmdi-close text-danger ms-4"></i>
        )}
      </td>

      <td>
        <div className="d-flex align-items-center">
          {!item.employeeId && <Badge color="secondary">Waiting...</Badge>}
          {item.employeeId && item?.employeeId?.image && (
            <img
              className="rounded-circle OrderItem__avatar shadow border-1"
              src={item.employeeId.image}
              alt={item.employeeId._id}
              width={38}
              height={38}
            />
          )}
          {item.employeeId && !item?.employeeId?.image && (
            <div
              style={{ width: "38px", height: "38px", backgroundColor: "#000" }}
              className="d-flex align-items-center justify-content-center rounded-circle text-white shadow border-1"
            >
              {item?.employeeId?.firstname[0]}
            </div>
          )}
          {item.employeeId && (
            <code className="text-dark fw-bold ms-2">{`${item?.employeeId?.firstname} ${item?.employeeId?.lastname}`}</code>
          )}
        </div>
      </td>

      <td>
        <Badge
          className={classNames({
            "bg-dark": item.state === "confirmed",
            "bg-warning": item.state === "shipping",
            "bg-danger": item.state === "cancelled",
            "bg-success": item.state === "delivered",
            "bg-info": item.state === "pending",
          })}
        >
          {capitalizeFirstLetter(item.state)}
        </Badge>
      </td>

      {/* handle actions */}

      <td>
        <div className="ps-4">
          <i
            onClick={() => handleViewClick(item)}
            className="zmdi zmdi-settings text-dark"
          />
        </div>
      </td>
    </tr>
  );
}

export default OrderItem;
