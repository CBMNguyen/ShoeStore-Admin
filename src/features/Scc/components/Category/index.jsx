import {
  createCategory,
  deleteCategory,
  fetchCategory,
  updateCategory,
} from "features/Scc/categorySlice";
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
import SccModel from "../SccModel";

function Category(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  const categoryState = useSelector((state) => state.category);
  const categories = categoryState.category;
  const { loading } = categoryState;

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

  const handleCategoryRemove = async (categoryId) => {
    try {
      await showToastSuccess(dispatch(deleteCategory(categoryId)));
      removeModel.closeModel();
    } catch (error) {
      showToastError(error);
    }
  };

  const handleFormSubmit = async (data) => {
    data.name = data.name.toLowerCase();
    if (!addModel.model.data) {
      try {
        await showToastSuccess(dispatch(createCategory(data)));
        addModel.closeModel();
      } catch (error) {
        showToastError(error);
      }
    } else {
      try {
        await showToastSuccess(
          dispatch(
            updateCategory({
              _id: addModel.model.data._id,
              name: data.name,
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
              <i onClick={handleAddClick} className="zmdi zmdi-plus p-1"></i>
            </th>
            <th>Category</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((c, i) => (
            <tr key={c._id}>
              <th>
                <span className="ps-1">{i + 1}</span>
              </th>
              <td>
                <div>{capitalizeFirstLetter(c.name)}</div>
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
          name="category"
          loading={loading}
          addModel={addModel}
          onSubmit={handleFormSubmit}
        />
      ) : null}

      {removeModel.model.show ? (
        <DeleteModel
          name="name"
          loading={loading}
          data={removeModel.model.data}
          closeModel={removeModel.closeModel}
          onRemoveClick={handleCategoryRemove}
        />
      ) : null}
    </React.Fragment>
  );
}

export default Category;
