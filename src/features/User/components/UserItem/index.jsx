import PropTypes from "prop-types";
import React from "react";
import { getAge } from "utils/common";

UserItem.propTypes = {
  index: PropTypes.number.isRequired,
  employee: PropTypes.object.isRequired,
  showRemoveModel: PropTypes.func,
  showViewModel: PropTypes.func,
};

UserItem.defaultProps = {
  showRemoveModel: null,
  showViewModel: null,
};

function UserItem(props) {
  const { index, user, showRemoveModel, showViewModel } = props;

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
      <th>{index}</th>
      <td>{`${user.firstname}  ${user.lastname}`}</td>
      <td>{user.email}</td>
      <td>{user.phone}</td>
      <td>
        <span className="ps-2">{getAge(birthDate)}</span>
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
