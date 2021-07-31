import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import employeeApi from "api/employee";
import jwt from "jsonwebtoken";

const initialState = {
  employee: [],
  pagination: {
    page: 1,
    limit: 1,
    totalRow: 1,
  },
  error: "",
  auth: null,
  loading: false,
};

export const employeeLogin = createAsyncThunk(
  "employee/login",
  async (data, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { message, accessToken } = await employeeApi.login(data);
      return fulfillWithValue({ message, accessToken });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchEmployee = createAsyncThunk(
  "employee/fetchEmployee",
  async (data, { rejectWithValue, fulfillWithValue }) => {
    try {
      const employee = await employeeApi.getAll(data);
      return fulfillWithValue(employee);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createEmployee = createAsyncThunk(
  "employee/createEmployee",
  async (employee, { rejectWithValue, fulfillWithValue }) => {
    try {
      const data = await employeeApi.create(employee);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateEmployee = createAsyncThunk(
  "employee/updateEmployee",
  async ({ _id, employee }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const data = await employeeApi.update(_id, employee);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteEmployee = createAsyncThunk(
  "employee/deleteEmployee",
  async (employeeId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const data = await employeeApi.delete(employeeId);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    logout: (state) => {
      state.auth.token = "";
    },
  },
  extraReducers: {
    // handle employee login
    [employeeLogin.pending]: (state) => {
      state.loading = true;
    },
    [employeeLogin.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [employeeLogin.fulfilled]: (state, action) => {
      const { accessToken } = action.payload;
      state.loading = false;
      state.auth = {
        token: accessToken,
        data: jwt.verify(accessToken, process.env.REACT_APP_JWT_KEY),
      };
      state.error = "";
    },

    // handle fetch employees
    [fetchEmployee.pending]: (state) => {
      state.loading = true;
    },
    [fetchEmployee.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [fetchEmployee.fulfilled]: (state, action) => {
      const { employees, pagination } = action.payload;
      state.loading = false;
      state.employee = employees;
      state.pagination = pagination;
    },

    // handle create new employee
    [createEmployee.pending]: (state) => {
      state.loading = true;
    },
    [createEmployee.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [createEmployee.fulfilled]: (state) => {
      state.loading = false;
      state.error = "";
    },

    // handle update employee
    [updateEmployee.pending]: (state) => {
      state.loading = true;
    },
    [updateEmployee.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateEmployee.fulfilled]: (state, action) => {
      const { employeeUpdated } = action.payload;
      state.loading = false;
      const index = state.employee.findIndex(
        (employee) => employee._id === employeeUpdated._id
      );
      if (index === -1) return;
      state.employee[index] = employeeUpdated;
      state.error = "";
    },

    // handle delete employee
    [deleteEmployee.pending]: (state) => {
      state.loading = true;
    },
    [deleteEmployee.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleteEmployee.fulfilled]: (state) => {
      state.loading = false;
      state.error = "";
    },
  },
});

const { reducer, actions } = employeeSlice;
export const { logout } = actions;

export default reducer;
