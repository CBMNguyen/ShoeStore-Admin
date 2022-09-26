import axiosClient from "./axiosClient";

const discountApi = {
  getAll: (params) => {
    const url = "/discount";
    return axiosClient.get(url, { params });
  },

  get: (id) => {
    const url = `/discount/${id}`;
    return axiosClient.get(url);
  },

  create: (data) => {
    const url = `/discount/`;
    return axiosClient.post(url, data);
  },

  update: (discountId, data) => {
    const url = `/discount/${discountId}`;
    return axiosClient.patch(url, data);
  },

  delete: (discountId) => {
    const url = `/discount/${discountId}`;
    return axiosClient.delete(url);
  },
};

export default discountApi;
