import axiosClient from "./axiosClient";

const productApi = {
  getAll: (params) => {
    const url = "/products";
    return axiosClient.get(url, { params });
  },

  get: (id) => {
    const url = `/products/${id}`;
    return axiosClient.get(url);
  },

  create: (data) => {
    const url = `/products/`;
    return axiosClient.post(url, data);
  },

  update: (productId, data) => {
    const url = `/products/${productId}`;
    return axiosClient.patch(url, data);
  },

  updateState: (productId, data) => {
    const url = `/products/state/${productId}`;
    return axiosClient.patch(url, data);
  },

  updateQuantity: (productId, data) => {
    const url = `/products/quantity/${productId}`;
    return axiosClient.patch(url, data);
  },

  delete: (productId) => {
    const url = `/products/${productId}`;
    return axiosClient.delete(url);
  },
};

export default productApi;
