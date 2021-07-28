import axiosClient from "./axiosClient";

const colorApi = {
  getAll: (params) => {
    const url = "/color";
    return axiosClient.get(url, { params });
  },

  get: (id) => {
    const url = `/color/${id}`;
    return axiosClient.get(url);
  },

  create: (data) => {
    const url = `/color/`;
    return axiosClient.post(url, data);
  },

  update: (colorId, data) => {
    const url = `/color/${colorId}`;
    return axiosClient.patch(url, data);
  },

  delete: (colorId) => {
    const url = `/color/${colorId}`;
    return axiosClient.delete(url);
  },
};

export default colorApi;
