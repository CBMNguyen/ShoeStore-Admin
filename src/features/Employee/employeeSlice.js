import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import employeeApi from "api/employee";

const initialState = {
  employee: [],
  error: "",
  loading: true,
};

export const fetchEmployee = createAsyncThunk(
  "employee/fetchEmployee",
  async (NULL, { rejectWithValue, fulfillWithValue }) => {
    try {
      const employee = await employeeApi.getAll();
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
      return fulfillWithValue({ message: data.message, employeeId });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {},
  extraReducers: {
    // handle fetch employees
    [fetchEmployee.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [fetchEmployee.fulfilled]: (state, action) => {
      const { employees } = action.payload;
      state.loading = false;
      state.employee = employees;
    },

    // handle create new employee
    [createEmployee.pending]: (state) => {
      state.loading = true;
    },
    [createEmployee.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [createEmployee.fulfilled]: (state, action) => {
      const { employeeCreated } = action.payload;
      state.loading = false;
      state.employee.push(employeeCreated);
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
    [deleteEmployee.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleteEmployee.fulfilled]: (state, action) => {
      const { employeeId } = action.payload;
      state.loading = false;
      const index = state.employee.findIndex((s) => s._id === employeeId);
      if (index === -1) return;
      state.employee.splice(index, 1);
    },
  },
});

const { reducer } = employeeSlice;

export default reducer;
