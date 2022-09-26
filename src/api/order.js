import axiosClient from "./axiosClient";

const orderApi = {
  getAll: () => {
    const url = `/order`;
    return axiosClient.get(url);
  },

  get: (id) => {
    const url = `/order/${id}`;
    return axiosClient.get(url);
  },

  create: (data) => {
    const url = `/order/`;
    return axiosClient.post(url, data);
  },

  update: (orderId, data) => {
    const url = `/order/${orderId}`;
    return axiosClient.patch(url, data);
  },

  updateState: (orderId, data) => {
    const url = `/order/state/${orderId}`;
    return axiosClient.patch(url, data);
  },
};

export default orderApi;
