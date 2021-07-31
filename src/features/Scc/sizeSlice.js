import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import sizeApi from "api/size";

const initialState = {
  size: [],
  error: "",
  loading: true,
};

export const fetchSize = createAsyncThunk(
  "size/fetchSize",
  async (NULL, { rejectWithValue, fulfillWithValue }) => {
    try {
      const size = await sizeApi.getAll();
      return fulfillWithValue(size);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createSize = createAsyncThunk(
  "size/createSize",
  async (size, { rejectWithValue, fulfillWithValue }) => {
    try {
      const data = await sizeApi.create(size);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateSize = createAsyncThunk(
  "size/updateSize",
  async ({ _id, size }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { message } = await sizeApi.update(_id, { size });
      return fulfillWithValue({ _id, size, message });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteSize = createAsyncThunk(
  "size/deleteSize",
  async (sizeId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { message } = await sizeApi.delete(sizeId);
      return fulfillWithValue({ sizeId, message });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const sizeSlice = createSlice({
  name: "size",
  initialState,
  reducers: {},
  extraReducers: {
    // handle fetch sizes
    [fetchSize.pending]: (state) => {
      state.loading = true;
    },
    [fetchSize.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [fetchSize.fulfilled]: (state, action) => {
      const { sizes } = action.payload;
      state.loading = false;
      state.size = sizes;
    },

    // handle create new size
    [createSize.pending]: (state) => {
      state.loading = true;
    },
    [createSize.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [createSize.fulfilled]: (state, action) => {
      const { newSize } = action.payload;
      state.loading = false;
      state.size.push(newSize);
      state.error = "";
    },

    // handle update size
    [updateSize.pending]: (state) => {
      state.loading = true;
    },
    [updateSize.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateSize.fulfilled]: (state, action) => {
      const { _id, size } = action.payload;
      state.loading = false;
      const index = state.size.findIndex((s) => s._id === _id);
      if (index === -1) return;
      state.size[index] = { _id, size };
      state.error = "";
    },

    // handle delete size
    [deleteSize.pending]: (state) => {
      state.loading = true;
    },
    [deleteSize.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleteSize.fulfilled]: (state, action) => {
      const { sizeId } = action.payload;
      state.loading = false;
      const index = state.size.findIndex((s) => s._id === sizeId);
      if (index === -1) return;
      state.size.splice(index, 1);
    },
  },
});

const { reducer } = sizeSlice;

export default reducer;
