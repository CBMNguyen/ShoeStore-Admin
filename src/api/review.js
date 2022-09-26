import axiosClient from "./axiosClient";

const reviewApi = {
  getAll: (params) => {
    const url = "/review";
    return axiosClient.get(url, { params });
  },

  get: (id) => {
    const url = `/review/${id}`;
    return axiosClient.get(url);
  },

  create: (data) => {
    const url = `/review/`;
    return axiosClient.post(url, data);
  },

  update: (reviewId, data) => {
    const url = `/review/${reviewId}`;
    return axiosClient.patch(url, data);
  },

  delete: (reviewId) => {
    const url = `/review/${reviewId}`;
    return axiosClient.delete(url);
  },
};

export default reviewApi;
