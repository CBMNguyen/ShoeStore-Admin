import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import positionApi from "api/position";

const initialState = {
  position: [],
  error: "",
  loading: true,
};

export const fetchPosition = createAsyncThunk(
  "position/fetchPosition",
  async (NULL, { rejectWithValue, fulfillWithValue }) => {
    try {
      const position = await positionApi.getAll();
      return fulfillWithValue(position);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createPosition = createAsyncThunk(
  "position/createPosition",
  async (position, { rejectWithValue, fulfillWithValue }) => {
    try {
      const data = await positionApi.create(position);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updatePosition = createAsyncThunk(
  "position/updatePosition",
  async ({ _id, position, salary }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { message } = await positionApi.update(_id, { position, salary });
      return fulfillWithValue({ _id, position, salary, message });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deletePosition = createAsyncThunk(
  "position/deletePosition",
  async (positionId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { message } = await positionApi.delete(positionId);
      return fulfillWithValue({ positionId, message });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const positionSlice = createSlice({
  name: "position",
  initialState,
  reducers: {},
  extraReducers: {
    // handle fetch position
    [fetchPosition.pending]: (state) => {
      state.loading = true;
    },
    [fetchPosition.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [fetchPosition.fulfilled]: (state, action) => {
      state.loading = false;
      state.position = action.payload.positions;
    },

    // handle create new position
    [createPosition.pending]: (state) => {
      state.loading = true;
    },
    [createPosition.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [createPosition.fulfilled]: (state, action) => {
      const { newPosition } = action.payload;
      state.loading = false;
      state.position.push(newPosition);
      state.error = "";
    },

    // handle update position
    [updatePosition.pending]: (state) => {
      state.loading = true;
    },
    [updatePosition.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updatePosition.fulfilled]: (state, action) => {
      const { _id, position, salary } = action.payload;
      state.loading = false;
      const index = state.position.findIndex((p) => p._id === _id);
      if (index === -1) return;
      state.position[index] = { _id, position, salary };
      state.error = "";
    },

    // handle delete position
    [deletePosition.pending]: (state) => {
      state.loading = true;
    },
    [deletePosition.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deletePosition.fulfilled]: (state, action) => {
      const { positionId } = action.payload;
      state.loading = false;
      const index = state.position.findIndex((p) => p._id === positionId);
      if (index === -1) return;
      state.position.splice(index, 1);
    },
  },
});

const { reducer } = positionSlice;

export default reducer;
