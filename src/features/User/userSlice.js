import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "api/user";

const initialState = {
  user: [],
  error: "",
  loading: true,
};

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (NULL, { rejectWithValue, fulfillWithValue }) => {
    try {
      const user = await userApi.getAll();
      return fulfillWithValue(user);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ userId, state }, { rejectWithValue, fulfillWithValue }) => {
    try {
      await userApi.update(userId, { state });
      return fulfillWithValue({ userId, state });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (userId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { message } = await userApi.delete(userId);
      return fulfillWithValue({ message, userId });
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
    [fetchUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [fetchUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload.users;
    },

    // handle update user
    [updateUser.pending]: (state) => {
      state.loading = true;
    },
    [updateUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.user = state.user.map((user) => {
        if (user._id === action.payload.userId) {
          user.state = action.payload.state;
          return user;
        } else {
          return user;
        }
      });
      state.loading = false;
      state.error = "";
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
      const { userId } = action.payload;
      const index = state.user.findIndex((u) => u._id === userId);

      if (!index) return;
      state.user.splice(index, 1);
      state.loading = false;
      state.error = "";
    },
  },
});

const { reducer } = userSlice;

export default reducer;
