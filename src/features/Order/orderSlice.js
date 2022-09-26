import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import orderApi from "api/order";

const initialState = {
  order: [],
  error: "",
  loading: false,
};

export const fetchOrder = createAsyncThunk(
  "order/fetchOrder",
  async (NULL, { rejectWithValue, fulfillWithValue }) => {
    try {
      const data = await orderApi.getAll();
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getOrderById = createAsyncThunk(
  "order/getOrder",
  async (id, { rejectWithValue, fulfillWithValue }) => {
    try {
      const order = await orderApi.get(id);
      return fulfillWithValue(order);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateOrder = createAsyncThunk(
  "order/updateOrder",
  async (id, { rejectWithValue, fulfillWithValue }) => {
    try {
      const data = await orderApi.update(id);
      return fulfillWithValue({ ...data, _id: id });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateStateOrder = createAsyncThunk(
  "order/updateStateOrder",
  async (
    { _id, state, payment, employee },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { message } = await orderApi.updateState(_id, {
        state,
        payment,
        employeeId: employee.employeeId,
      });
      return fulfillWithValue({
        _id,
        state,
        employee,
        payment,
        message,
      });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    getOrderWithCart: (state, action) => {
      state.order = action.payload;
    },
  },

  // handle get order
  extraReducers: {
    [fetchOrder.pending]: (state) => {
      state.loading = true;
    },
    [fetchOrder.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [fetchOrder.fulfilled]: (state, action) => {
      const { order } = action.payload;
      state.loading = false;
      state.order = order;
      state.error = "";
    },

    // handle update order
    [updateOrder.pending]: (state) => {
      state.loading = true;
    },
    [updateOrder.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateOrder.fulfilled]: (state, action) => {
      const { _id } = action.payload;
      state.loading = false;
      const index = state.order.findIndex((order) => order._id === _id);
      if (index === -1) return;
      state.order[index].state = "cancelled";
      state.error = "";
    },

    // handle update order state

    [updateStateOrder.pending]: (state) => {
      state.loading = true;
    },
    [updateStateOrder.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateStateOrder.fulfilled]: (state, action) => {
      const { _id, state: orderState, payment, employee } = action.payload;
      state.loading = false;
      const index = state.order.findIndex((order) => order._id === _id);
      if (index === -1) return;
      state.order[index].state = orderState;
      state.order[index].payment = payment;
      state.order[index].employeeId = employee;
      state.error = "";
    },
  },
});

const { actions, reducer } = orderSlice;
export const { getOrderWithCart } = actions;
export default reducer;
