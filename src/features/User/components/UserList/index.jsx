import PropTypes from "prop-types";
import React from "react";
import { Table } from "reactstrap";
import UserItem from "../UserItem";

UserList.propTypes = {
  employees: PropTypes.array,
  showRemoveModel: PropTypes.func.isRequired,
  showViewModel: PropTypes.func.isRequired,
};

UserList.defaultProps = {
  users: [],
};

function UserList(props) {
  const { users, showRemoveModel, showViewModel } = props;
  return (
    <Table hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Age</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <UserItem
            key={user._id}
            showRemoveModel={showRemoveModel}
            showViewModel={showViewModel}
            user={user}
            index={index}
          />
        ))}
      </tbody>
    </Table>
  );
}

export default UserList;
