import PropTypes from "prop-types";
import React from "react";
import { Badge } from "reactstrap";
import { getAge } from "utils/common";

UserItem.propTypes = {
  index: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired,
  pagination: PropTypes.object.isRequired,
  showRemoveModel: PropTypes.func,
  showViewModel: PropTypes.func,
};

UserItem.defaultProps = {
  showRemoveModel: null,
  showViewModel: null,
};

function UserItem(props) {
  const { index, user, showRemoveModel, showViewModel, pagination } = props;

  const { page, limit } = pagination;

  const birthDate = new Date(user.birthdate);

  const handleRemoveClick = (user) => {
    if (!showRemoveModel) return;
    showRemoveModel(user);
  };

  const handleViewClick = (user) => {
    if (!showViewModel) return;
    showViewModel(user);
  };

  return (
    <tr>
      <th>{index + 1 + (page - 1) * limit}</th>
      <td>
        <Badge className="bg-dark">{`${user.firstname}  ${user.lastname}`}</Badge>
      </td>
      <td>
        <Badge style={{ backgroundColor: "deeppink" }}>{user.email}</Badge>
      </td>
      <td>
        <Badge style={{ backgroundColor: "cyan" }}>{user.phone}</Badge>
      </td>
      <td>
        <span className="ps-2">
          <Badge className="bg-warning">{getAge(birthDate)}</Badge>
        </span>
      </td>
      <td>
        {" "}
        <i
          onClick={() => handleViewClick(user)}
          className="zmdi zmdi-eye text-primary"
        />
        <i
          onClick={() => handleRemoveClick(user)}
          className="zmdi zmdi-delete text-danger ps-3"
        />
      </td>
    </tr>
  );
}

export default UserItem;
