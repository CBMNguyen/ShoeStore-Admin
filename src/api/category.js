import axiosClient from "./axiosClient";

const categoryApi = {
  getAll: (params) => {
    const url = "/category";
    return axiosClient.get(url, { params });
  },

  get: (id) => {
    const url = `/category/${id}`;
    return axiosClient.get(url);
  },

  create: (data) => {
    const url = `/category/`;
    return axiosClient.post(url, data);
  },

  update: (categoryId, data) => {
    const url = `/category/${categoryId}`;
    return axiosClient.patch(url, data);
  },

  delete: (categoryId) => {
    const url = `/category/${categoryId}`;
    return axiosClient.delete(url);
  },
};

export default categoryApi;
