import Loading from "components/Loading";
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
  const [filter, setFilter] = useState({
    page: 1,
    limit: 8,

    name: "",
    category: "",
    price: 0,
    quantity: 0,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProduct());
    dispatch(fetchSize());
    dispatch(fetchColor());
    dispatch(fetchCategory());
  }, [dispatch]);

  const productState = useSelector((state) => state.products);
  const { loading, products } = productState;

  const { size } = useSelector((state) => state.size);
  const { color } = useSelector((state) => state.color);
  const { category } = useSelector((state) => state.category);

  // Options React-Select

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

  // Pagination and filter product equal redux

  const filterProducts = products.filter((product) => {
    return (
      product.name.toLowerCase().indexOf(filter["name"].toLowerCase()) !== -1 &&
      product.category.name
        .toLowerCase()
        .indexOf(filter["category"].toLowerCase()) !== -1
    );
  });

  let sortProducts = filterProducts;
  // sort product increase price
  filter["price"] === 1 &&
    (sortProducts = filterProducts.sort(
      (a, b) => a.originalPrice - b.originalPrice
    ));

  // sort product decrease price
  filter["price"] === -1 &&
    (sortProducts = filterProducts.sort(
      (a, b) => b.originalPrice - a.originalPrice
    ));

  // sort product increase quantity
  filter["quantity"] === 1 &&
    (sortProducts = filterProducts.sort(
      (a, b) => a.quantityStock - b.quantityStock
    ));

  // sort product decrease quantity
  filter["quantity"] === -1 &&
    (sortProducts = filterProducts.sort(
      (a, b) => b.quantityStock - a.quantityStock
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

  const handleCategoryChange = (category) => {
    category = category === "All" ? "" : category;
    setFilter({ ...filter, page: 1, category });
  };

  const handlePriceChange = (price) => {
    setFilter({ ...filter, price });
  };

  const handleQuantityChange = (quantity) => {
    setFilter({ ...filter, quantity });
  };

  //========================================//
  const addModel = useModel();
  const removeModel = useModel();
  const viewModel = useModel();

  // handle add update delete product

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
    } catch (error) {
      showToastError(error);
    }
  };

  return products.length === 0 ? (
    <Loading />
  ) : (
    <div className="MainPage">
      <TableHeader
        name="Brand"
        showModel={addModel.showModel}
        options={PRODUCT_CATEGORY_OPTIONS}
        onOptionsChange={handleCategoryChange}
        onNameChange={handleNameChange}
      />

      <ProductList
        filter={filter}
        products={sortProducts.slice(start, end)}
        showDeleteModel={removeModel.showModel}
        showUpdateModel={addModel.showModel}
        showViewModel={viewModel.showModel}
        onPriceChange={handlePriceChange}
        onQuantityChange={handleQuantityChange}
      />

      <TableFooter
        onPageChange={handlePageChange}
        filter={filter}
        totalRow={products.length}
      />

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
