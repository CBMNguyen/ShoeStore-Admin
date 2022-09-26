import classNames from "classnames";
import PropTypes from "prop-types";
import React, { useState } from "react";
import {
  Badge,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spinner,
  Table,
} from "reactstrap";
import UserItem from "../UserItem";
import "./userlist.scss";
import brandLogo from "../../../../assets/images/brandLogo.png";

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
  const {
    users,
    filter,
    onAgeChange,
    showRemoveModel,
    onLockUserClick,
    loading,
  } = props;

  const { age } = filter;

  const handleAgeChange = (age) => {
    if (!onAgeChange) return;
    onAgeChange(age);
  };

  const [modal, setModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState();

  const toggle = () => setModal(!modal);

  const handleLockUserClick = async () => {
    if (!onLockUserClick) return;
    await onLockUserClick(selectedUser);
    toggle();
  };

  return (
    <Table hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Avatar</th>
          <th>Name</th>
          <th>Gender</th>
          <th>Email</th>
          <th>Address</th>
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
          <th>State</th>
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
            filter={filter}
            toggle={toggle}
            setSelectedUser={setSelectedUser}
          />
        ))}
      </tbody>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          <h4 className="UserList__brand">
            Shoes Store <img src={brandLogo} alt="brandLogo" />
          </h4>
        </ModalHeader>
        <ModalBody>
          Are you sure you want to{" "}
          <code className="text-dark fw-bold">
            {selectedUser?.state ? "Unlock " : "Block "}
          </code>
          <Badge className="bg-danger">{`${selectedUser?.firstname} ${selectedUser?.lastname}`}</Badge>{" "}
          account?
        </ModalBody>
        <ModalFooter>
          <Button
            disabled={loading}
            color="primary"
            size="sm"
            onClick={handleLockUserClick}
          >
            Confirm {loading && <Spinner size="sm">{""}</Spinner>}
          </Button>{" "}
          <Button
            disabled={loading}
            color="secondary"
            size="sm"
            onClick={toggle}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </Table>
  );
}

export default UserList;
