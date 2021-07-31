import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoryApi from "api/category";

const initialState = {
  category: [],
  error: "",
  loading: true,
};

export const fetchCategory = createAsyncThunk(
  "category/fetchCategory",
  async (NULL, { rejectWithValue, fulfillWithValue }) => {
    try {
      const categories = await categoryApi.getAll();
      return fulfillWithValue(categories);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createCategory = createAsyncThunk(
  "category/createCategory",
  async (category, { rejectWithValue, fulfillWithValue }) => {
    try {
      const data = await categoryApi.create(category);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async ({ _id, name }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { message } = await categoryApi.update(_id, { name });
      return fulfillWithValue({ _id, name, message });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (categoryId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { message } = await categoryApi.delete(categoryId);
      return fulfillWithValue({ categoryId, message });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: {
    // handle fetch categories
    [fetchCategory.pending]: (state) => {
      state.loading = true;
    },
    [fetchCategory.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [fetchCategory.fulfilled]: (state, action) => {
      const { categories } = action.payload;
      state.loading = false;
      state.category = categories;
    },

    // handle create new category
    [createCategory.pending]: (state) => {
      state.loading = true;
    },
    [createCategory.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [createCategory.fulfilled]: (state, action) => {
      const { newCategory } = action.payload;
      state.loading = false;
      state.category.push(newCategory);
      state.error = "";
    },

    // handle update category
    [updateCategory.pending]: (state) => {
      state.loading = true;
    },
    [updateCategory.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateCategory.fulfilled]: (state, action) => {
      const { _id, name } = action.payload;
      state.loading = false;
      const index = state.category.findIndex((c) => c._id === _id);
      if (index === -1) return;
      state.category[index] = { _id, name };
      state.error = "";
    },

    // handle delete category
    [deleteCategory.pending]: (state) => {
      state.loading = true;
    },
    [deleteCategory.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleteCategory.fulfilled]: (state, action) => {
      const { categoryId } = action.payload;
      state.loading = false;
      const index = state.category.findIndex((c) => c._id === categoryId);
      if (index === -1) return;
      state.category.splice(index, 1);
    },
  },
});

const { reducer } = categorySlice;

export default reducer;
