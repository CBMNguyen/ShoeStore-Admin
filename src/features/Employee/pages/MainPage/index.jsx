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
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  capitalizeFirstLetter,
  showToastError,
  showToastSuccess,
} from "utils/common";

function MainPage(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      await showToastSuccess(dispatch(fetchEmployee()));
      await showToastSuccess(dispatch(fetchPosition()));
    };
    fetchData();
  }, [dispatch]);

  const employeeState = useSelector((state) => state.employee);
  const positions = useSelector((state) => state.position.position);

  const employees = employeeState.employee;
  const { error, loading } = employeeState;

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
      } catch (error) {
        showToastError(error);
      }
    } else {
      try {
        await showToastSuccess(
          dispatch(updateEmployee({ _id: model.data._id, employee: formData }))
        );
      } catch (error) {
        showToastError(error);
      }
    }
  };

  const handleEmployeeDelete = async (employeeId) => {
    try {
      await showToastSuccess(dispatch(deleteEmployee(employeeId)));
    } catch (error) {
      showToastError(error);
    }
  };

  return (
    <div className="MainPage">
      <TableHeader showModel={showModel} />
      <EmployeeList
        employees={employees}
        showEditModel={showModel}
        showRemoveModel={removeModel.showModel}
        showViewModel={viewModel.showModel}
      />

      {model.show ? (
        <EmployeeAddModel
          loading={loading}
          error={error}
          onSubmit={handleEmployeeAddForm}
          model={model}
          closeModel={closeModel}
          positionOptions={POSITION_OPTIONS}
        />
      ) : null}

      {removeModel.model.show && (
        <EmployeeDeleteModel
          onDeleteClick={handleEmployeeDelete}
          data={removeModel.model.data}
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
