import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productApi from "api/product";

const initialState = {
  products: [],
  error: "",
  loading: false,
};

export const fetchProduct = createAsyncThunk(
  "product/fetchProduct",
  async (NULL, { rejectWithValue, fulfillWithValue }) => {
    try {
      const products = await productApi.getAll();
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

export const updateProductState = createAsyncThunk(
  "product/updateProductState",
  async ({ id, formData }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const data = await productApi.updateState(id, formData);
      return fulfillWithValue({ id, state: data.state });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (productId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { message } = await productApi.delete(productId);
      return fulfillWithValue({ productId, message });
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
    [fetchProduct.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [fetchProduct.fulfilled]: (state, action) => {
      const { products } = action.payload;
      state.loading = false;
      state.products = products;
      state.error = "";
    },

    // handle create new product
    [createProduct.pending]: (state) => {
      state.loading = true;
    },
    [createProduct.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [createProduct.fulfilled]: (state, action) => {
      const { productCreated } = action.payload;
      state.loading = false;
      state.products.push(productCreated);
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

    // handle update state product
    [updateProductState.pending]: (state) => {
      state.loading = true;
    },
    [updateProductState.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateProductState.fulfilled]: (state, action) => {
      state.loading = false;
      const index = state.products.findIndex(
        (product) => product._id === action.payload.id
      );
      if (index === -1) return;
      state.products[index].state = action.payload.state;
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
    [deleteProduct.fulfilled]: (state, action) => {
      const { productId } = action.payload;
      state.loading = false;
      const index = state.products.findIndex(
        (product) => product._id === productId
      );
      if (index === -1) return;
      state.products.splice(index, 1);
      state.error = "";
    },
  },
});

const { reducer } = productSlice;
export default reducer;
