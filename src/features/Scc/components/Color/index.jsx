import {
  createColor,
  deleteColor,
  fetchColor,
  updateColor,
} from "features/Scc/colorSlice";
import useModel from "hooks/useModel";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "reactstrap";
import { showToastError, showToastSuccess } from "utils/common";
import DeleteModel from "../DeleteModel";
import SccModel from "../SccModel";

function Color(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchColor());
  }, [dispatch]);

  const colorState = useSelector((state) => state.color);
  const { color, loading } = colorState;

  const addModel = useModel();
  const removeModel = useModel();

  const handleAddClick = () => {
    addModel.showModel();
  };

  const handleUpdateClick = (data) => {
    addModel.showModel(data);
  };

  const handleRemoveClick = async (data) => {
    removeModel.showModel(data);
  };

  const handleColorRemove = async (colorId) => {
    try {
      await showToastSuccess(dispatch(deleteColor(colorId)));
      removeModel.closeModel();
    } catch (error) {
      showToastError(error);
    }
  };

  const handleFormSubmit = async (data) => {
    data.color = data.color.toLowerCase();
    if (!addModel.model.data) {
      try {
        await showToastSuccess(dispatch(createColor(data)));
        addModel.closeModel();
      } catch (error) {
        showToastError(error);
      }
    } else {
      try {
        await showToastSuccess(
          dispatch(
            updateColor({
              _id: addModel.model.data._id,
              color: data.color,
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
            <th>Color</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {color.map((c, i) => (
            <tr key={c._id}>
              <th>
                <span className="ps-1">{i + 1}</span>
              </th>
              <td>
                <span>
                  <code
                    style={{
                      backgroundColor: `${c.color}`,
                      fontWeight: "bolder",
                    }}
                    className={
                      c.color === "white"
                        ? "text-dark py-1 px-2 rounded-2 shadow"
                        : "text-white py-1 px-2 rounded-2 shadow"
                    }
                  >
                    {c.color}
                  </code>
                </span>
              </td>
              <td width={100}>
                <i
                  onClick={() => handleUpdateClick(c)}
                  className="zmdi zmdi-edit text-primary ps-3"
                />
                <i
                  onClick={() => handleRemoveClick(c)}
                  className="zmdi zmdi-delete text-danger ps-3"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {addModel.model.show ? (
        <SccModel
          name="color"
          loading={loading}
          addModel={addModel}
          onSubmit={handleFormSubmit}
        />
      ) : null}

      {removeModel.model.show ? (
        <DeleteModel
          name="color"
          loading={loading}
          data={removeModel.model.data}
          closeModel={removeModel.closeModel}
          onRemoveClick={handleColorRemove}
        />
      ) : null}
    </React.Fragment>
  );
}

export default Color;
