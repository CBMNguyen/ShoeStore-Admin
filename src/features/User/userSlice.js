import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "api/user";

const initialState = {
  user: [],
  pagination: {
    page: 1,
    limit: 1,
    totalRow: 1,
  },
  error: "",
  loading: true,
};

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (data, { rejectWithValue, fulfillWithValue }) => {
    try {
      const user = await userApi.getAll(data);
      return fulfillWithValue(user);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ _id, user }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { userUpdated } = await userApi.update(_id, user);
      return fulfillWithValue(userUpdated);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (userId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const data = await userApi.delete(userId);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    // handle fetch users
    [fetchUser.pending]: (state) => {
      state.loading = false;
    },
    [fetchUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [fetchUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload.users;
      state.pagination = action.payload.pagination;
    },

    // handle delete user
    [deleteUser.pending]: (state) => {
      state.loading = true;
    },
    [deleteUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = "";
    },
  },
});

const { reducer } = userSlice;

export default reducer;
