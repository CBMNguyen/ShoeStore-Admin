import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "api/user";

const initialState = {
  user: [],
  error: "",
  loading: true,
};

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const user = await userApi.getAll();
  return user;
});

export const createUser = createAsyncThunk("user/createUser", async (user) => {
  const { userCreated } = await userApi.create(user);
  return userCreated;
});

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ _id, user }) => {
    const { userUpdated } = await userApi.update(_id, user);
    return userUpdated;
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (userId) => {
    await userApi.delete(userId);
    return userId;
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
    // handle create new user
    [createUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [createUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.user.push(action.payload);
    },
    // handle update user
    [updateUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.loading = false;
      const index = state.user.findIndex(
        (user) => user._id === action.payload._id
      );
      if (index === -1) return;
      state.user[index] = action.payload;
    },
    // handle delete user
    [deleteUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.loading = false;
      const index = state.user.findIndex((s) => s._id === action.payload);
      if (index === -1) return;
      state.user.splice(index, 1);
    },
  },
});

const { reducer } = userSlice;

export default reducer;
