import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import discountApi from "api/discount";

const initialState = {
  discount: [],
  error: "",
  loading: true,
};

export const fetchDiscounts = createAsyncThunk(
  "discount/fetchDiscount",
  async (NULL, { rejectWithValue, fulfillWithValue }) => {
    try {
      const discount = await discountApi.getAll();
      return fulfillWithValue(discount);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createDiscount = createAsyncThunk(
  "discount/createDiscount",
  async (discount, { rejectWithValue, fulfillWithValue }) => {
    try {
      const data = await discountApi.create(discount);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateDiscount = createAsyncThunk(
  "discount/updateDiscount",
  async (discount, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { message } = await discountApi.update(discount._id, discount);
      return fulfillWithValue({ discount, message });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteDiscount = createAsyncThunk(
  "discount/deleteDiscount",
  async (discountId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { message } = await discountApi.delete(discountId);
      return fulfillWithValue({ discountId, message });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const discountSlice = createSlice({
  name: "discount",
  initialState,
  reducers: {},
  extraReducers: {
    // handle fetch discount
    [fetchDiscounts.pending]: (state) => {
      state.loading = true;
    },
    [fetchDiscounts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [fetchDiscounts.fulfilled]: (state, action) => {
      state.loading = false;
      state.discount = action.payload.discounts;
    },

    // handle create new discount
    [createDiscount.pending]: (state) => {
      state.loading = true;
    },
    [createDiscount.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [createDiscount.fulfilled]: (state, action) => {
      const { newDiscount } = action.payload;
      state.loading = false;
      state.discount.push(newDiscount);
      state.error = "";
    },

    // handle update discount
    [updateDiscount.pending]: (state) => {
      state.loading = true;
    },
    [updateDiscount.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateDiscount.fulfilled]: (state, action) => {
      const discount = action.payload.discount;
      state.loading = false;
      const index = state.discount.findIndex((p) => p._id === discount._id);
      if (index === -1) return;
      state.discount[index] = discount;
      state.error = "";
    },

    // handle delete discount
    [deleteDiscount.pending]: (state) => {
      state.loading = true;
    },
    [deleteDiscount.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleteDiscount.fulfilled]: (state, action) => {
      const { discountId } = action.payload;
      state.loading = false;
      const index = state.discount.findIndex((dc) => dc._id === discountId);
      if (index === -1) return;
      state.discount.splice(index, 1);
    },
  },
});

const { reducer } = discountSlice;

export default reducer;
