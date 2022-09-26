import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import discountTypeApi from "api/discountType";

const initialState = {
  discountType: [],
  error: "",
  loading: true,
};

export const fetchDiscountType = createAsyncThunk(
  "discountType/fetchDiscountType",
  async (NULL, { rejectWithValue, fulfillWithValue }) => {
    try {
      const data = await discountTypeApi.getAll();
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createDiscountType = createAsyncThunk(
  "discountType/createDiscountType",
  async (discountTypeName, { rejectWithValue, fulfillWithValue }) => {
    try {
      const data = await discountTypeApi.create(discountTypeName);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateDiscountType = createAsyncThunk(
  "discountType/updateDiscountType",
  async ({ _id, discountTypeName }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { message } = await discountTypeApi.update(_id, {
        discountTypeName,
      });
      return fulfillWithValue({ _id, discountTypeName, message });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteDiscountType = createAsyncThunk(
  "discountType/deleteDiscountType",
  async (discountTypeId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { message } = await discountTypeApi.delete(discountTypeId);
      return fulfillWithValue({ discountTypeId, message });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const discountTypeSlice = createSlice({
  name: "discountType",
  initialState,
  reducers: {},
  extraReducers: {
    // handle fetch discountType
    [fetchDiscountType.pending]: (state) => {
      state.loading = true;
    },
    [fetchDiscountType.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [fetchDiscountType.fulfilled]: (state, action) => {
      state.loading = false;
      state.discountType = action.payload.discountTypes;
    },

    // handle create new discountType
    [createDiscountType.pending]: (state) => {
      state.loading = true;
    },
    [createDiscountType.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [createDiscountType.fulfilled]: (state, action) => {
      const { newDiscountType } = action.payload;
      state.loading = false;
      state.discountType.push(newDiscountType);
      state.error = "";
    },

    // handle update discountType
    [updateDiscountType.pending]: (state) => {
      state.loading = true;
    },
    [updateDiscountType.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateDiscountType.fulfilled]: (state, action) => {
      const { _id, discountTypeName } = action.payload;
      state.loading = false;
      const index = state.discountType.findIndex((dc) => dc._id === _id);
      if (index === -1) return;
      state.discountType[index] = { _id, discountTypeName };
      state.error = "";
    },

    // handle delete discountType
    [deleteDiscountType.pending]: (state) => {
      state.loading = true;
    },
    [deleteDiscountType.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleteDiscountType.fulfilled]: (state, action) => {
      const { discountTypeId } = action.payload;
      state.loading = false;
      const index = state.discountType.findIndex(
        (dc) => dc._id === discountTypeId
      );
      if (index === -1) return;
      state.discountType.splice(index, 1);
    },
  },
});

const { reducer } = discountTypeSlice;

export default reducer;
