import {
  createDiscountType,
  deleteDiscountType,
  fetchDiscountType,
  updateDiscountType,
} from "features/Scc/discountTypeSlice";
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
import DiscountTypeModel from "../DiscountTypeModal";

function DiscountType(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDiscountType());
  }, [dispatch]);

  const discountTypeState = useSelector((state) => state.discountType);
  const discountTypes = discountTypeState.discountType;
  const { loading } = discountTypeState;

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

  const handleDiscountTypeRemove = async (discountTypeId) => {
    try {
      await showToastSuccess(dispatch(deleteDiscountType(discountTypeId)));
      removeModel.closeModel();
    } catch (error) {
      showToastError(error);
    }
  };

  const handleFormSubmit = async (data) => {
    data.discountTypeName = data.discountTypeName.toLowerCase();
    if (!model.data) {
      try {
        await showToastSuccess(dispatch(createDiscountType(data)));
        addModel.closeModel();
      } catch (error) {
        showToastError(error);
      }
    } else {
      try {
        await showToastSuccess(
          await dispatch(
            updateDiscountType({
              _id: model.data._id,
              discountTypeName: data.discountTypeName,
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
            <th>Discount Type</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {discountTypes?.slice().map((discountType, i) => (
            <tr key={discountType._id}>
              <th>
                <span className="ps-1">{i + 1}</span>
              </th>
              <td>{capitalizeFirstLetter(discountType["discountTypeName"])}</td>
              <td width={100}>
                <i
                  onClick={() => handleUpdateClick(discountType)}
                  className="zmdi zmdi-edit text-primary ps-3"
                />
                <i
                  onClick={() => handleRemoveClick(discountType)}
                  className="zmdi zmdi-delete text-danger ps-3"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {model.show ? (
        <DiscountTypeModel
          loading={loading}
          onSubmit={handleFormSubmit}
          closeModel={closeModel}
          model={model}
        />
      ) : null}

      {removeModel.model.show ? (
        <DeleteModel
          name="this discount type"
          loading={loading}
          data={removeModel.model.data}
          closeModel={removeModel.closeModel}
          onRemoveClick={handleDiscountTypeRemove}
        />
      ) : null}
    </React.Fragment>
  );
}

export default DiscountType;
