import axiosClient from "./axiosClient";

const importOrderApi = {
  getAll: (params) => {
    const url = "/importOrder";
    return axiosClient.get(url, { params });
  },

  get: (id) => {
    const url = `/importOrder/${id}`;
    return axiosClient.get(url);
  },

  create: (data) => {
    const url = `/importOrder/`;
    return axiosClient.post(url, data);
  },

  update: (importOrderId, data) => {
    const url = `/importOrder/${importOrderId}`;
    return axiosClient.patch(url, data);
  },

  delete: (importOrderId) => {
    const url = `/importOrder/${importOrderId}`;
    return axiosClient.delete(url);
  },
};

export default importOrderApi;
