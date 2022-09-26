import axiosClient from "./axiosClient";

const roleApi = {
  getAll: (params) => {
    const url = "/role";
    return axiosClient.get(url, { params });
  },

  get: (id) => {
    const url = `/role/${id}`;
    return axiosClient.get(url);
  },

  create: (data) => {
    const url = `/role/`;
    return axiosClient.post(url, data);
  },

  update: (roleId, data) => {
    const url = `/role/${roleId}`;
    return axiosClient.patch(url, data);
  },

  delete: (roleId) => {
    const url = `/role/${roleId}`;
    return axiosClient.delete(url);
  },
};

export default roleApi;
