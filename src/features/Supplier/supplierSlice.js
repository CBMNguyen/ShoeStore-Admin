import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import supplierApi from "api/supplier";

const initialState = {
  supplier: [],
  error: "",
  loading: true,
};

export const fetchSuppliers = createAsyncThunk(
  "supplier/fetchSupplier",
  async (NULL, { rejectWithValue, fulfillWithValue }) => {
    try {
      const supplier = await supplierApi.getAll();
      return fulfillWithValue(supplier);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createSupplier = createAsyncThunk(
  "supplier/createSupplier",
  async (supplier, { rejectWithValue, fulfillWithValue }) => {
    try {
      const data = await supplierApi.create(supplier);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateSupplier = createAsyncThunk(
  "supplier/updateSupplier",
  async (supplier, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { message } = await supplierApi.update(supplier._id, supplier);
      return fulfillWithValue({ supplier, message });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteSupplier = createAsyncThunk(
  "supplier/deleteSupplier",
  async (supplierId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { message } = await supplierApi.delete(supplierId);
      return fulfillWithValue({ supplierId, message });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const supplierSlice = createSlice({
  name: "supplier",
  initialState,
  reducers: {},
  extraReducers: {
    // handle fetch supplier
    [fetchSuppliers.pending]: (state) => {
      state.loading = true;
    },
    [fetchSuppliers.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [fetchSuppliers.fulfilled]: (state, action) => {
      state.loading = false;
      state.supplier = action.payload.suppliers;
    },

    // handle create new supplier
    [createSupplier.pending]: (state) => {
      state.loading = true;
    },
    [createSupplier.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [createSupplier.fulfilled]: (state, action) => {
      const { newSupplier } = action.payload;
      state.loading = false;
      state.supplier.push(newSupplier);
      state.error = "";
    },

    // handle update supplier
    [updateSupplier.pending]: (state) => {
      state.loading = true;
    },
    [updateSupplier.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateSupplier.fulfilled]: (state, action) => {
      const supplier = action.payload.supplier;
      state.loading = false;
      const index = state.supplier.findIndex((s) => s._id === supplier._id);
      if (index === -1) return;
      state.supplier[index] = supplier;
      state.error = "";
    },

    // handle delete supplier
    [deleteSupplier.pending]: (state) => {
      state.loading = true;
    },
    [deleteSupplier.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleteSupplier.fulfilled]: (state, action) => {
      const { supplierId } = action.payload;
      state.loading = false;
      const index = state.supplier.findIndex((dc) => dc._id === supplierId);
      if (index === -1) return;
      state.supplier.splice(index, 1);
    },
  },
});

const { reducer } = supplierSlice;

export default reducer;
