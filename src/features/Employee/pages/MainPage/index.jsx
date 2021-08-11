import Loading from "components/Loading";
import TableFooter from "components/TableFooter";
import TableHeader from "components/TableHeader";
import EmployeeAddModel from "features/Employee/components/EmployeeAddModel";
import EmployeeDeleteModel from "features/Employee/components/EmployeeDeleteModel";
import EmployeeList from "features/Employee/components/EmployeeList";
import EmployeeViewModel from "features/Employee/components/EmployeeViewModel";
import {
  createEmployee,
  deleteEmployee,
  fetchEmployee,
  updateEmployee,
} from "features/Employee/employeeSlice";
import { fetchPosition } from "features/Scc/positionSlice";
import useModel from "hooks/useModel";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  capitalizeFirstLetter,
  getAge,
  showToastError,
  showToastSuccess,
} from "utils/common";

function MainPage(props) {
  const [filter, setFilter] = useState({
    page: 1,
    limit: 12,

    age: 0,
    position: "",
    name: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEmployee());
    dispatch(fetchPosition());
  }, [dispatch]);

  const employeeState = useSelector((state) => state.employee);
  const positions = useSelector((state) => state.position.position);

  const employees = employeeState.employee;
  const { loading } = employeeState;

  // Options React - Select

  const POSITION_OPTIONS = positions.map((position) => ({
    value: position["_id"],
    label: capitalizeFirstLetter(position["position"]),
  }));

  const addModel = useModel();
  const removeModel = useModel();
  const viewModel = useModel();

  const { closeModel, showModel, model } = addModel;

  // handle Pagination and filter equal redux

  const filterEmployees = employees.filter((employee) => {
    return (
      employee.position["position"]
        .toLowerCase()
        .indexOf(filter["position"].toLowerCase()) !== -1 &&
      (employee.firstname
        .toLowerCase()
        .indexOf(filter["name"].toLowerCase()) !== -1 ||
        employee.lastname
          .toLowerCase()
          .indexOf(filter["name"].toLowerCase()) !== -1)
    );
  });

  let sortEmployees = filterEmployees;

  // sort employee increase age
  filter["age"] === 1 &&
    (sortEmployees = filterEmployees.sort(
      (a, b) => getAge(new Date(a.birthdate)) - getAge(new Date(b.birthdate))
    ));

  // sort employee decrease age
  filter["age"] === -1 &&
    (sortEmployees = filterEmployees.sort(
      (a, b) => getAge(new Date(b.birthdate)) - getAge(new Date(a.birthdate))
    ));

  const start = (filter["page"] - 1) * filter["limit"];
  const end = filter["page"] * filter["limit"];

  // handle Change Pagination and filter

  const handlePageChange = (page) => {
    setFilter({ ...filter, page });
  };

  const handleNameChange = (name) => {
    setFilter({ ...filter, page: 1, name });
  };

  const handlePositionChange = (position) => {
    position = position === "All" ? "" : position;
    setFilter({ ...filter, page: 1, position });
  };

  const handleAgeChange = (age) => {
    setFilter({ ...filter, age });
  };

  const handleEmployeeAddForm = async (data) => {
    const formData = new FormData();
    formData.append("firstname", data.firstname);
    formData.append("lastname", data.lastname);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("gender", data.gender.value);
    formData.append("birthdate", data.birthdate.toISOString());
    formData.append("position", data.position.value);
    formData.append("image", data.image);
    formData.append("address", data.address);

    if (!model.data) {
      try {
        await showToastSuccess(dispatch(createEmployee(formData)));
        closeModel();
      } catch (error) {
        showToastError(error);
      }
    } else {
      try {
        await showToastSuccess(
          dispatch(updateEmployee({ _id: model.data._id, employee: formData }))
        );
        closeModel();
      } catch (error) {
        showToastError(error);
      }
    }
  };

  const handleEmployeeDelete = async (employeeId) => {
    try {
      await showToastSuccess(dispatch(deleteEmployee(employeeId)));
      removeModel.closeModel();
    } catch (error) {
      showToastError(error);
    }
  };

  return employees.length === 0 ? (
    <Loading />
  ) : (
    <div className="MainPage">
      <TableHeader
        filter={filter}
        name="Position"
        onNameChange={handleNameChange}
        options={POSITION_OPTIONS}
        onOptionsChange={handlePositionChange}
        showModel={showModel}
      />

      <EmployeeList
        filter={filter}
        employees={sortEmployees.slice(start, end)}
        showEditModel={showModel}
        showRemoveModel={removeModel.showModel}
        showViewModel={viewModel.showModel}
        onAgeChange={handleAgeChange}
      />

      <TableFooter
        onPageChange={handlePageChange}
        filter={filter}
        totalRow={employees.length}
      />

      {model.show ? (
        <EmployeeAddModel
          loading={loading}
          onSubmit={handleEmployeeAddForm}
          model={model}
          closeModel={closeModel}
          positionOptions={POSITION_OPTIONS}
        />
      ) : null}

      {removeModel.model.show && (
        <EmployeeDeleteModel
          loading={loading}
          data={removeModel.model.data}
          onRemoveClick={handleEmployeeDelete}
          closeModel={removeModel.closeModel}
        />
      )}

      {viewModel.model.show && (
        <EmployeeViewModel
          data={viewModel.model.data}
          closeModel={viewModel.closeModel}
        />
      )}
    </div>
  );
}

export default withRouter(MainPage);
