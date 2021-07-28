import axiosClient from "./axiosClient";

const positionApi = {
  getAll: (params) => {
    const url = "/position";
    return axiosClient.get(url, { params });
  },

  get: (id) => {
    const url = `/position/${id}`;
    return axiosClient.get(url);
  },

  create: (data) => {
    const url = `/position/`;
    return axiosClient.post(url, data);
  },

  update: (positionId, data) => {
    const url = `/position/${positionId}`;
    return axiosClient.patch(url, data);
  },

  delete: (positionId) => {
    const url = `/position/${positionId}`;
    return axiosClient.delete(url);
  },
};

export default positionApi;
