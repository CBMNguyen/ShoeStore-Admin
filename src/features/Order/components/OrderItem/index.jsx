import classNames from "classnames";
import moment from "moment";
import PropTypes from "prop-types";
import React from "react";
import { Badge } from "reactstrap";
import { capitalizeFirstLetter } from "utils/common";
import "./orderitem.scss";

OrderItem.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  showModel: PropTypes.func,
};

OrderItem.defaultProps = {
  showModel: null,
};

function OrderItem(props) {
  const { item, total, index, showModel } = props;

  const handleViewClick = (data) => {
    if (!showModel) return;
    showModel(data);
  };

  return (
    <tr className="OrderItem">
      <td>{index + 1}</td>

      <td>
        <div className="OrderItem__person">
          <img
            className="rounded-circle"
            src={item.user.image}
            alt={item.user._id}
            width={38}
            height={38}
          />
          <Badge className="bg-light text-dark ms-4">{`${item.user.firstname} ${item.user.lastname}`}</Badge>
        </div>
      </td>

      {/* format date */}

      <td>
        <Badge className="bg-dark">
          {moment(new Date(item.createdAt), "YYYYMMDD").fromNow()}
        </Badge>
      </td>

      <td>
        <Badge className="bg-warning">{total}$</Badge>
      </td>

      <td>
        <Badge
          className={classNames({
            "bg-danger": item.state === "processing",
            "bg-success": item.state === "deliveried",
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
