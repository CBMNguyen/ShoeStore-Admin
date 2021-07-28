import {
  createSize,
  deleteSize,
  fetchSize,
  updateSize,
} from "features/Scc/sizeSlice";
import useModel from "hooks/useModel";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "reactstrap";
import { showToastError, showToastSuccess } from "utils/common";
import DeleteModel from "../DeleteModel";
import SccModel from "../SccModel";

function Size(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      await showToastSuccess(dispatch(fetchSize()));
    };
    fetchData();
  }, [dispatch]);

  const sizeState = useSelector((state) => state.size) || [];

  const { size, loading, error } = sizeState;

  const addModel = useModel();
  const removeModel = useModel();

  const handleAddClick = () => {
    addModel.showModel();
  };

  const handleUpdateClick = (data) => {
    addModel.showModel(data);
  };

  const handleRemoveClick = (data) => {
    removeModel.showModel(data);
  };

  const handleSizeRemove = async (sizeId) => {
    try {
      await showToastSuccess(dispatch(deleteSize(sizeId)));
    } catch (error) {
      showToastError(error);
    }
  };

  const handleFormSubmit = async (data) => {
    data.size = parseInt(data.size); // converse string to number
    if (!addModel.model.data) {
      try {
        await showToastSuccess(dispatch(createSize(data)));
      } catch (error) {
        showToastError(error);
      }
    } else {
      try {
        await showToastSuccess(
          dispatch(
            updateSize({
              _id: addModel.model.data._id,
              size: data.size,
            })
          )
        );
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
            <th>Size</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {size
            .slice()
            .sort((a, b) => parseInt(a.size) - parseInt(b.size)) // sort by size
            .map((s, i) => (
              <tr key={s._id}>
                <th>
                  <span className="ps-1">{i}</span>
                </th>
                <td>
                  <div className="ps-1">{s.size}</div>
                </td>
                <td width={100}>
                  <i
                    onClick={() => handleUpdateClick(s)}
                    className="zmdi zmdi-edit text-primary ps-3"
                  />
                  <i
                    onClick={() => handleRemoveClick(s)}
                    className="zmdi zmdi-delete text-danger ps-3"
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      {addModel.model.show ? (
        <SccModel
          name="size"
          loading={loading}
          error={error}
          addModel={addModel}
          onSubmit={handleFormSubmit}
        />
      ) : null}

      {removeModel.model.show ? (
        <DeleteModel
          data={removeModel.model.data}
          closeModel={removeModel.closeModel}
          name="size"
          onRemoveClick={handleSizeRemove}
        />
      ) : null}
    </React.Fragment>
  );
}

export default Size;
