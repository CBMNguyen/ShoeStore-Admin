import {
  createPosition,
  deletePosition,
  fetchPosition,
  updatePosition,
} from "features/Scc/positionSlice";
import useModel from "hooks/useModel";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "reactstrap";
import {
  capitalizeFirstLetter,
  showToastError,
  showToastSuccess,
} from "utils/common";
import DeleteModel from "../DeleteModel";
import PositionModel from "../PositionModel";

function Position(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosition());
  }, [dispatch]);

  const positionState = useSelector((state) => state.position);

  const positions = positionState.position;
  const { loading } = positionState;

  const addModel = useModel();
  const removeModel = useModel();

  const { closeModel, showModel, model } = addModel;

  const handleAddClick = () => {
    showModel();
  };

  const handleUpdateClick = (position) => {
    showModel(position);
  };

  const handleRemoveClick = async (position) => {
    removeModel.showModel(position);
  };

  const handlePositionRemove = async (positionId) => {
    try {
      await showToastSuccess(dispatch(deletePosition(positionId)));
      removeModel.closeModel();
    } catch (error) {
      showToastError(error);
    }
  };

  const handleFormSubmit = async (data) => {
    data.salary = parseInt(data.salary);
    data.position = data.position.toLowerCase();
    if (!model.data) {
      try {
        await showToastSuccess(dispatch(createPosition(data)));
        addModel.closeModel();
      } catch (error) {
        showToastError(error);
      }
    } else {
      try {
        await showToastSuccess(
          await dispatch(
            updatePosition({
              _id: model.data._id,
              position: data.position,
              salary: data.salary,
            })
          )
        );
        addModel.closeModel();
      } catch (error) {
        showToastError(error);
      }
    }
  };

  return (
    <React.Fragment>
      <Table size="sm">
        <thead>
          <tr>
            <th>
              <i onClick={handleAddClick} className="zmdi zmdi-plus p-1" />
            </th>
            <th>Position</th>
            <th>Salary</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {positions
            .slice()
            .sort((a, b) => a.salary - b.salary)
            .map((position, i) => (
              <tr key={position._id}>
                <th>
                  <span className="ps-1">{i + 1}</span>
                </th>
                <td>{capitalizeFirstLetter(position["position"])}</td>
                <td className="ps-2">{position["salary"]} $</td>
                <td width={100}>
                  <i
                    onClick={() => handleUpdateClick(position)}
                    className="zmdi zmdi-edit text-primary ps-3"
                  />
                  <i
                    onClick={() => handleRemoveClick(position)}
                    className="zmdi zmdi-delete text-danger ps-3"
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      {model.show ? (
        <PositionModel
          loading={loading}
          onSubmit={handleFormSubmit}
          closeModel={closeModel}
          model={model}
        />
      ) : null}

      {removeModel.model.show ? (
        <DeleteModel
          name="position"
          loading={loading}
          data={removeModel.model.data}
          closeModel={removeModel.closeModel}
          onRemoveClick={handlePositionRemove}
        />
      ) : null}
    </React.Fragment>
  );
}

export default Position;
