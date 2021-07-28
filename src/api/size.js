import axiosClient from "./axiosClient";

const sizeApi = {
  getAll: (params) => {
    const url = "/size";
    return axiosClient.get(url, { params });
  },

  get: (id) => {
    const url = `/size/${id}`;
    return axiosClient.get(url);
  },

  create: (data) => {
    const url = `/size/`;
    return axiosClient.post(url, data);
  },

  update: (sizeId, data) => {
    const url = `/size/${sizeId}`;
    return axiosClient.patch(url, data);
  },

  delete: (sizeId) => {
    const url = `/size/${sizeId}`;
    return axiosClient.delete(url);
  },
};

export default sizeApi;
