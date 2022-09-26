import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import roleApi from "api/role";

const initialState = {
  role: [],
  error: "",
  loading: true,
};

export const fetchRole = createAsyncThunk(
  "role/fetchRole",
  async (NULL, { rejectWithValue, fulfillWithValue }) => {
    try {
      const role = await roleApi.getAll();
      return fulfillWithValue(role);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createRole = createAsyncThunk(
  "role/createRole",
  async (role, { rejectWithValue, fulfillWithValue }) => {
    try {
      const data = await roleApi.create(role);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateRole = createAsyncThunk(
  "role/updateRole",
  async ({ _id, role }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { message } = await roleApi.update(_id, { role });
      return fulfillWithValue({ _id, role, message });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteRole = createAsyncThunk(
  "role/deleteRole",
  async (roleId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { message } = await roleApi.delete(roleId);
      return fulfillWithValue({ roleId, message });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {},
  extraReducers: {
    // handle fetch role
    [fetchRole.pending]: (state) => {
      state.loading = true;
    },
    [fetchRole.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [fetchRole.fulfilled]: (state, action) => {
      state.loading = false;
      state.role = action.payload.roles;
    },

    // handle create new role
    [createRole.pending]: (state) => {
      state.loading = true;
    },
    [createRole.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [createRole.fulfilled]: (state, action) => {
      const { newRole } = action.payload;
      state.loading = false;
      state.role.push(newRole);
      state.error = "";
    },

    // handle update role
    [updateRole.pending]: (state) => {
      state.loading = true;
    },
    [updateRole.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateRole.fulfilled]: (state, action) => {
      const { _id, role } = action.payload;
      state.loading = false;
      const index = state.role.findIndex((r) => r._id === _id);
      if (index === -1) return;
      state.role[index] = { _id, role };
      state.error = "";
    },

    // handle delete role
    [deleteRole.pending]: (state) => {
      state.loading = true;
    },
    [deleteRole.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleteRole.fulfilled]: (state, action) => {
      const { roleId } = action.payload;
      state.loading = false;
      const index = state.role.findIndex((r) => r._id === roleId);
      if (index === -1) return;
      state.role.splice(index, 1);
    },
  },
});

const { reducer } = roleSlice;

export default reducer;
