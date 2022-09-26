import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import importOrderApi from "api/importOrder";

const initialState = {
  importOrder: [],
  error: "",
  loading: false,
};

export const fetchImportOrder = createAsyncThunk(
  "importOrder/fetchImportOrders",
  async (NULL, { rejectWithValue, fulfillWithValue }) => {
    try {
      const importOrder = await importOrderApi.getAll();
      return fulfillWithValue(importOrder);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createImportOrder = createAsyncThunk(
  "importOrder/createImportOrder",
  async (importOrder, { rejectWithValue, fulfillWithValue }) => {
    try {
      const data = await importOrderApi.create(importOrder);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateImportOrder = createAsyncThunk(
  "importOrder/updateImportOrder",
  async (importOrder, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { message } = await importOrderApi.update(
        importOrder._id,
        importOrder
      );
      return fulfillWithValue({ importOrder, message });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteImportOrder = createAsyncThunk(
  "importOrder/deleteImportOrder",
  async (importOrderId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { message } = await importOrderApi.delete(importOrderId);
      return fulfillWithValue({ importOrderId, message });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const importOrderSlice = createSlice({
  name: "importOrder",
  initialState,
  extraReducers: {
    // handle fetch import order
    [fetchImportOrder.pending]: (state) => {
      state.loading = true;
    },
    [fetchImportOrder.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [fetchImportOrder.fulfilled]: (state, action) => {
      state.loading = false;
      state.importOrder = action.payload.importOrder;
    },

    // handle create new import order
    [createImportOrder.pending]: (state) => {
      state.loading = true;
    },
    [createImportOrder.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [createImportOrder.fulfilled]: (state, action) => {
      const { newImportOrder } = action.payload;
      state.loading = false;
      state.importOrder.push(newImportOrder);
      state.error = "";
    },

    // handle update import order
    [updateImportOrder.pending]: (state) => {
      state.loading = true;
    },
    [updateImportOrder.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateImportOrder.fulfilled]: (state, action) => {
      const importOrder = action.payload.importOrder;
      state.loading = false;
      const index = state.importOrder.findIndex(
        (s) => s._id === importOrder._id
      );
      if (index === -1) return;
      state.importOrder[index] = importOrder;
      state.error = "";
    },

    // handle delete import order
    [deleteImportOrder.pending]: (state) => {
      state.loading = true;
    },
    [deleteImportOrder.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleteImportOrder.fulfilled]: (state, action) => {
      const { importOrderId } = action.payload;
      state.loading = false;
      const index = state.importOrder.findIndex(
        (dc) => dc._id === importOrderId
      );
      if (index === -1) return;
      state.importOrder.splice(index, 1);
    },
  },
});

const { reducer } = importOrderSlice;
export default reducer;
