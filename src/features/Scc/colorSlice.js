import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import colorApi from "api/color";

const initialState = {
  color: [],
  error: "",
  loading: true,
};

export const fetchColor = createAsyncThunk(
  "color/fetchColor",
  async (NULL, { rejectWithValue, fulfillWithValue }) => {
    try {
      const color = await colorApi.getAll();
      return fulfillWithValue(color);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createColor = createAsyncThunk(
  "color/createColor",
  async (color, { rejectWithValue, fulfillWithValue }) => {
    try {
      const data = await colorApi.create(color);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateColor = createAsyncThunk(
  "color/updateColor",
  async ({ _id, color }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { message } = await colorApi.update(_id, { color });
      return fulfillWithValue({ _id, color, message });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteColor = createAsyncThunk(
  "color/deleteColor",
  async (colorId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { message } = await colorApi.delete(colorId);
      return fulfillWithValue({ colorId, message });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const colorSlice = createSlice({
  name: "color",
  initialState,
  reducers: {},
  extraReducers: {
    // handle fetch colors
    [fetchColor.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [fetchColor.fulfilled]: (state, action) => {
      const { colors } = action.payload;
      state.loading = false;
      state.color = colors;
    },

    // handle create new color
    [createColor.pending]: (state) => {
      state.loading = true;
    },
    [createColor.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [createColor.fulfilled]: (state, action) => {
      const { newColor } = action.payload;
      state.loading = false;
      state.color.push(newColor);
      state.error = "";
    },

    // handle update color
    [updateColor.pending]: (state) => {
      state.loading = true;
    },
    [updateColor.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateColor.fulfilled]: (state, action) => {
      const { _id, color } = action.payload;
      state.loading = false;
      const index = state.color.findIndex((c) => c._id === _id);
      if (index === -1) return;
      state.color[index] = { _id, color };
      state.error = "";
    },

    // handle delete color
    [deleteColor.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleteColor.fulfilled]: (state, action) => {
      const { colorId } = action.payload;
      state.loading = false;
      const index = state.color.findIndex((c) => c._id === colorId);
      if (index === -1) return;
      state.color.splice(index, 1);
    },
  },
});

const { reducer } = colorSlice;

export default reducer;
