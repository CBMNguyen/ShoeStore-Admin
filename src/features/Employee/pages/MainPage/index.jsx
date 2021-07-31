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
import {
  capitalizeFirstLetter,
  showToastError,
  showToastSuccess,
} from "utils/common";

function MainPage(props) {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState({
    page: 1,
    age: 0,
    position: "",
    name: "",
  });

  useEffect(() => {
    dispatch(fetchEmployee(filter));
  }, [dispatch, filter]);

  useEffect(() => {
    dispatch(fetchPosition());
  }, [dispatch]);

  const employeeState = useSelector((state) => state.employee);
  const positions = useSelector((state) => state.position.position);

  const employees = employeeState.employee;
  const { loading, pagination } = employeeState;

  const POSITION_OPTIONS = positions.map((position) => ({
    value: position["_id"],
    label: capitalizeFirstLetter(position["position"]),
  }));

  const addModel = useModel();
  const removeModel = useModel();
  const viewModel = useModel();

  const { closeModel, showModel, model } = addModel;

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
        setFilter({ ...filter });
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
      setFilter({ ...filter });
    } catch (error) {
      showToastError(error);
    }
  };

  const handlePageChange = (page) => {
    setFilter({ ...filter, page });
  };

  const handleNameChange = (name) => {
    setFilter({ ...filter, page: 1, name });
  };

  const handlePositionChange = (position) => {
    setFilter({ ...filter, page: 1, position });
  };

  const handleAgeChange = (age) => {
    setFilter({ ...filter, age });
  };

  return (
    <div className="MainPage">
      <TableHeader
        showModel={showModel}
        options={POSITION_OPTIONS}
        onOptionsChange={handlePositionChange}
        name="Position"
        onNameChange={handleNameChange}
      />

      <EmployeeList
        showEditModel={showModel}
        showRemoveModel={removeModel.showModel}
        showViewModel={viewModel.showModel}
        employees={employees}
        age={filter.age}
        onAgeChange={handleAgeChange}
        pagination={pagination}
      />

      <TableFooter pagination={pagination} onPageChange={handlePageChange} />

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

export default MainPage;
