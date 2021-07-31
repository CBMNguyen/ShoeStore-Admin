import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productApi from "api/product";

const initialState = {
  products: [],
  pagination: {
    page: 1,
    limit: 1,
    totalRow: 1,
  },
  error: "",
  loading: false,
};

export const fetchProduct = createAsyncThunk(
  "product/fetchProduct",
  async (data, { rejectWithValue, fulfillWithValue }) => {
    try {
      const products = await productApi.getAll(data);
      return fulfillWithValue(products);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (product, { rejectWithValue, fulfillWithValue }) => {
    try {
      const data = await productApi.create(product);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ id, formData }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const data = await productApi.update(id, formData);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (productId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const data = await productApi.delete(productId);
      return fulfillWithValue({ productId, message: data.message });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: {
    // handle fetch products
    [fetchProduct.pending]: (state) => {
      state.loading = true;
    },
    [fetchProduct.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [fetchProduct.fulfilled]: (state, action) => {
      const { products, pagination } = action.payload;
      state.loading = false;
      state.products = products;
      state.pagination = pagination;
    },

    // handle create new product
    [createProduct.pending]: (state) => {
      state.loading = true;
    },
    [createProduct.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [createProduct.fulfilled]: (state) => {
      state.loading = false;
      state.error = "";
    },

    // handle update product
    [updateProduct.pending]: (state) => {
      state.loading = true;
    },
    [updateProduct.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateProduct.fulfilled]: (state, action) => {
      const { productUpdated } = action.payload;
      state.loading = false;
      const index = state.products.findIndex(
        (product) => product._id === productUpdated._id
      );
      if (index === -1) return;
      state.products[index] = productUpdated;
      state.error = "";
    },

    // handle delete product
    [deleteProduct.pending]: (state) => {
      state.loading = true;
    },
    [deleteProduct.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleteProduct.fulfilled]: (state) => {
      state.loading = false;
      state.error = "";
    },
  },
});

const { reducer } = productSlice;

export default reducer;
