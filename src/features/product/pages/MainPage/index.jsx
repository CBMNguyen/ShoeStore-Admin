import TableFooter from "components/TableFooter";
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
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  capitalizeFirstLetter,
  colourNameToHex,
  showToastError,
  showToastSuccess,
} from "utils/common";

function MainPage(props) {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState({
    page: 1,
    name: "",
    category: "",
    price: 0,
    quantity: 0,
  });

  useEffect(() => {
    dispatch(fetchProduct(filter));
  }, [dispatch, filter]);

  useEffect(() => {
    dispatch(fetchSize());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchColor());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  const productState = useSelector((state) => state.products);
  const { loading, products, pagination } = productState;
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
  const removeModel = useModel();
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
        addModel.closeModel();
        setFilter({ ...filter });
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
        addModel.closeModel();
      } catch (error) {
        showToastError(error);
      }
    }
  };

  const handleProductDelete = async (productId) => {
    try {
      await showToastSuccess(dispatch(deleteProduct(productId)));
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

  const handleCategoryChange = (category) => {
    setFilter({ ...filter, page: 1, category });
  };

  const handlePriceChange = (price) => {
    setFilter({ ...filter, price });
  };

  const handleQuantityChange = (quantity) => {
    setFilter({ ...filter, quantity });
  };

  return (
    <div className="MainPage">
      <TableHeader
        name="Brand"
        showModel={addModel.showModel}
        pagination={pagination}
        onNameChange={handleNameChange}
        onOptionsChange={handleCategoryChange}
        options={PRODUCT_CATEGORY_OPTIONS}
      />

      <ProductList
        showDeleteModel={removeModel.showModel}
        showUpdateModel={addModel.showModel}
        showViewModel={viewModel.showModel}
        products={products}
        page={pagination.page}
        price={filter.price}
        onPriceChange={handlePriceChange}
        onQuantityChange={handleQuantityChange}
        quantity={filter.quantity}
      />

      <TableFooter onPageChange={handlePageChange} pagination={pagination} />

      {addModel.model.show ? (
        <ProductAddModel
          loading={loading}
          withModel={addModel}
          categoryOptions={PRODUCT_CATEGORY_OPTIONS}
          sizeOptions={PRODUCT_SIZE_OPTIONS}
          colorOptions={PRODUCT_COLOR_OPTIONS}
          onFormSubmit={handleFormSubmit}
        />
      ) : null}

      {removeModel.model.show ? (
        <ProductDeleteModel
          loading={loading}
          closeModel={removeModel.closeModel}
          data={removeModel.model.data}
          onRemoveClick={handleProductDelete}
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
