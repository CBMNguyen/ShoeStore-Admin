import TableHeader from "components/TableHeader";
import ProductAddModel from "features/product/components/ProductAddModel";
import ProductDeleteModel from "features/product/components/ProductDeleteModel";
import ProductList from "features/product/components/ProductList";
import ProductViewModel from "features/product/components/ProductViewModel";
import {
  createProduct,
  deleteProduct,
  fetchProduct,
  updateProduct,
} from "features/product/productSlice";
import { fetchCategory } from "features/Scc/categorySlice";
import { fetchColor } from "features/Scc/colorSlice";
import { fetchSize } from "features/Scc/sizeSlice";
import useModel from "hooks/useModel";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  capitalizeFirstLetter,
  colourNameToHex,
  showToastError,
  showToastSuccess,
} from "utils/common";
import "./main.scss";

MainPage.propTypes = {};

function MainPage(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await showToastSuccess(dispatch(fetchProduct()));
      await showToastSuccess(dispatch(fetchSize()));
      await showToastSuccess(dispatch(fetchColor()));
      await showToastSuccess(dispatch(fetchCategory()));
    };
    fetchData();
  }, [dispatch]);

  const productState = useSelector((state) => state.products) || [];
  const { error, loading, products } = productState;
  const { size } = useSelector((state) => state.size);
  const { color } = useSelector((state) => state.color);
  const { category } = useSelector((state) => state.category);

  const PRODUCT_SIZE_OPTIONS = size
    .slice()
    .sort((a, b) => a.size - b.size)
    .map((s) => ({
      label: s.size,
      value: s._id,
    }));

  const PRODUCT_COLOR_OPTIONS = color.map((c) => ({
    value: c._id,
    label: capitalizeFirstLetter(c.color),
    color: colourNameToHex(c.color),
  }));

  const PRODUCT_CATEGORY_OPTIONS = category.map((c) => ({
    value: c._id,
    label: capitalizeFirstLetter(c.name),
  }));

  const addModel = useModel();
  const deleteModel = useModel();
  const viewModel = useModel();

  const handleFormSubmit = async (data) => {
    const formData = new FormData();
    formData.append("category", data.category.value);
    formData.append("description", data.description);
    formData.append("isFreeShip", data.isFreeShip);
    formData.append("name", data.name);
    formData.append("originalPrice", data.originalPrice);
    formData.append("promotionPercent", data.promotionPercent);
    formData.append("quantityStock", data.quantityStock);

    const images = Array.from(data.images);
    images.forEach((img) => {
      formData.append("images", img);
    });

    data.size = data.size.map((s) => s.value);
    data.size.forEach((s) => {
      formData.append("size", s);
    });

    data.color = data.color.map((c) => c.value);
    data.color.forEach((s) => {
      formData.append("color", s);
    });

    if (!addModel.model.data) {
      try {
        await showToastSuccess(dispatch(createProduct(formData)));
      } catch (error) {
        showToastError(error);
      }
    } else {
      try {
        await showToastSuccess(
          dispatch(
            updateProduct({ id: addModel.model.data._id, formData: formData })
          )
        );
      } catch (error) {
        showToastError(error);
      }
    }
  };

  const handleProductDelete = async (productId) => {
    try {
      await showToastSuccess(dispatch(deleteProduct(productId)));
    } catch (error) {
      showToastError(error);
    }
  };

  return (
    <div className="MainPage">
      <TableHeader showModel={addModel.showModel} />
      <ProductList
        products={products}
        showDeleteModel={deleteModel.showModel}
        showUpdateModel={addModel.showModel}
        showViewModel={viewModel.showModel}
      />

      {addModel.model.show ? (
        <ProductAddModel
          error={error}
          loading={loading}
          categoryOptions={PRODUCT_CATEGORY_OPTIONS}
          sizeOptions={PRODUCT_SIZE_OPTIONS}
          colorOptions={PRODUCT_COLOR_OPTIONS}
          withModel={addModel}
          onFormSubmit={handleFormSubmit}
        />
      ) : null}

      {deleteModel.model.show ? (
        <ProductDeleteModel
          closeModel={deleteModel.closeModel}
          data={deleteModel.model.data}
          onDeleteProductClick={handleProductDelete}
        />
      ) : null}

      {viewModel.model.show ? (
        <ProductViewModel
          closeModel={viewModel.closeModel}
          data={viewModel.model.data}
        />
      ) : null}
    </div>
  );
}

export default MainPage;
