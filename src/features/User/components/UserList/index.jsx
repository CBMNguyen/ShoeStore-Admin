import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import { Table } from "reactstrap";
import UserItem from "../UserItem";
import "./userlist.scss";

UserList.propTypes = {
  filter: PropTypes.object.isRequired,
  employees: PropTypes.array,
  onAgeChange: PropTypes.func,
  showRemoveModel: PropTypes.func.isRequired,
  showViewModel: PropTypes.func.isRequired,
};

UserList.defaultProps = {
  users: [],
};

function UserList(props) {
  const { users, filter, onAgeChange, showRemoveModel, showViewModel } = props;

  const { age } = filter;

  const handleAgeChange = (age) => {
    if (!onAgeChange) return;
    onAgeChange(age);
  };

  return (
    <Table hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>
            Age
            <span>
              <i
                onClick={() => handleAgeChange(1)}
                className={classNames(
                  "UserList__increase  zmdi zmdi-caret-up",
                  { "UserList__increase--active": age === 1 }
                )}
              />
              <i
                onClick={() => handleAgeChange(-1)}
                className={classNames(
                  "UserList__decrease  zmdi zmdi-caret-down",
                  { "UserList__decrease--active": age === -1 }
                )}
              />
            </span>
          </th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <UserItem
            index={index}
            key={user._id}
            user={user}
            showRemoveModel={showRemoveModel}
            showViewModel={showViewModel}
            filter={filter}
          />
        ))}
      </tbody>
    </Table>
  );
}

export default UserList;
