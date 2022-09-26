import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import reviewApi from "api/review";

const initialState = {
  review: [],
  error: "",
  loading: true,
};

export const fetchReviews = createAsyncThunk(
  "review/fetchReview",
  async (NULL, { rejectWithValue, fulfillWithValue }) => {
    try {
      const review = await reviewApi.getAll();
      return fulfillWithValue(review);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createReview = createAsyncThunk(
  "review/createReview",
  async (review, { rejectWithValue, fulfillWithValue }) => {
    try {
      const data = await reviewApi.create(review);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateReview = createAsyncThunk(
  "review/updateReview",
  async ({ _id, review }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { message } = await reviewApi.update(_id, review);
      return fulfillWithValue({ _id, review, message });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteReview = createAsyncThunk(
  "review/deleteReview",
  async (reviewId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { message } = await reviewApi.delete(reviewId);
      return fulfillWithValue({ reviewId, message });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {},
  extraReducers: {
    // handle fetch review
    [fetchReviews.pending]: (state) => {
      state.loading = true;
    },
    [fetchReviews.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [fetchReviews.fulfilled]: (state, action) => {
      state.loading = false;
      state.review = action.payload.reviews;
    },

    // handle create new review
    [createReview.pending]: (state) => {
      state.loading = true;
    },
    [createReview.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [createReview.fulfilled]: (state, action) => {
      const { newReview } = action.payload;
      state.loading = false;
      state.review.push(newReview);
      state.error = "";
    },

    // handle update review
    [updateReview.pending]: (state) => {
      state.loading = true;
    },
    [updateReview.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateReview.fulfilled]: (state, action) => {
      const { _id, review } = action.payload;
      state.loading = false;
      const index = state.review.findIndex((r) => r._id === _id);
      if (index === -1) return;
      state.review[index].state = review.state;
      state.error = "";
    },

    // handle delete review
    [deleteReview.pending]: (state) => {
      state.loading = true;
    },
    [deleteReview.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleteReview.fulfilled]: (state, action) => {
      const { reviewId } = action.payload;
      state.loading = false;
      const index = state.review.findIndex((r) => r._id === reviewId);
      if (index === -1) return;
      state.review.splice(index, 1);
    },
  },
});

const { reducer } = reviewSlice;

export default reducer;
