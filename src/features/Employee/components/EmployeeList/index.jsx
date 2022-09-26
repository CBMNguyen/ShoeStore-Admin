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
import EmployeeItem from "../EmployeeItem";
import "./employeelist.scss";
import brandLogo from "../../../../assets/images/brandLogo.png";

EmployeeList.propTypes = {
  showEditModel: PropTypes.func.isRequired,
  showRemoveModel: PropTypes.func.isRequired,
  onLockEmployeeClick: PropTypes.func.isRequired,
  employees: PropTypes.array,
  onAgeChange: PropTypes.func,
  filter: PropTypes.object.isRequired,
};

EmployeeList.defaultProps = {
  employees: [],
  onAgeChange: null,
};

function EmployeeList(props) {
  const {
    showEditModel,
    showRemoveModel,
    onLockEmployeeClick,
    loading,
    employees,
    onAgeChange,
    filter,
  } = props;

  const { age } = filter;

  const handleAgeChange = (age) => {
    if (!onAgeChange) return;
    onAgeChange(age);
  };

  const [modal, setModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState();

  const toggle = () => setModal(!modal);

  const handleLockEmployeeClick = async () => {
    if (!onLockEmployeeClick) return;
    await onLockEmployeeClick(selectedEmployee);
    toggle();
  };

  return (
    <Table hover className="EmployeeList">
      <thead>
        <tr>
          <th>#</th>
          <th>Avatar</th>
          <th>Name</th>
          <th>Gender</th>
          <th>Address</th>
          <th>Email</th>
          <th>Phone</th>
          <th>
            Age
            <span>
              <i
                onClick={() => handleAgeChange(1)}
                className={classNames(
                  "EmployeeList__increase  zmdi zmdi-caret-up",
                  { "EmployeeList__increase--active": age === 1 }
                )}
              />
              <i
                onClick={() => handleAgeChange(-1)}
                className={classNames(
                  "EmployeeList__decrease  zmdi zmdi-caret-down",
                  { "EmployeeList__decrease--active": age === -1 }
                )}
              />
            </span>
          </th>
          <th>Position</th>
          <th>Salary</th>
          <th>State</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee, index) => (
          <EmployeeItem
            key={employee._id}
            showEditModel={showEditModel}
            showRemoveModel={showRemoveModel}
            employee={employee}
            setSelectedEmployee={setSelectedEmployee}
            index={index}
            filter={filter}
            toggle={toggle}
          />
        ))}
      </tbody>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          <h4 className="EmployeeList__brand">
            Shoes Store <img src={brandLogo} alt="brandLogo" />
          </h4>
        </ModalHeader>
        <ModalBody>
          Are you sure you want to{" "}
          <code className="text-dark fw-bold">
            {selectedEmployee?.state ? "unlock " : "block "}
          </code>
          <Badge className="bg-danger">{`${selectedEmployee?.firstname} ${selectedEmployee?.lastname}`}</Badge>{" "}
          account?
        </ModalBody>
        <ModalFooter>
          <Button
            disabled={loading}
            color="primary"
            size="sm"
            onClick={handleLockEmployeeClick}
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

export default EmployeeList;
