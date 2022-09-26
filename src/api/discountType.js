import axiosClient from "./axiosClient";

const discountTypeApi = {
  getAll: (params) => {
    const url = "/discountType";
    return axiosClient.get(url, { params });
  },

  get: (id) => {
    const url = `/discountType/${id}`;
    return axiosClient.get(url);
  },

  create: (data) => {
    const url = `/discountType/`;
    return axiosClient.post(url, data);
  },

  update: (discountTypeId, data) => {
    const url = `/discountType/${discountTypeId}`;
    return axiosClient.patch(url, data);
  },

  delete: (discountTypeId) => {
    const url = `/discountType/${discountTypeId}`;
    return axiosClient.delete(url);
  },
};

export default discountTypeApi;
