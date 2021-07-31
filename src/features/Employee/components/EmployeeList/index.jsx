import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import { Table } from "reactstrap";
import EmployeeItem from "../EmployeeItem";
import "./employeelist.scss";

EmployeeList.propTypes = {
  showEditModel: PropTypes.func.isRequired,
  showRemoveModel: PropTypes.func.isRequired,
  showViewModel: PropTypes.func.isRequired,
  employees: PropTypes.array,
  onAgeChange: PropTypes.func,
  pagination: PropTypes.object.isRequired,
};

EmployeeList.defaultProps = {
  employees: [],
  onAgeChange: null,
};

function EmployeeList(props) {
  const {
    showEditModel,
    showRemoveModel,
    showViewModel,
    employees,
    age,
    onAgeChange,
    pagination,
  } = props;

  const handleAgeChange = (age) => {
    if (!onAgeChange) return;
    onAgeChange(age);
  };

  return (
    <Table hover className="EmployeeList">
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
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee, index) => (
          <EmployeeItem
            key={employee._id}
            showEditModel={showEditModel}
            showRemoveModel={showRemoveModel}
            showViewModel={showViewModel}
            employee={employee}
            index={index}
            pagination={pagination}
          />
        ))}
      </tbody>
    </Table>
  );
}

export default EmployeeList;
