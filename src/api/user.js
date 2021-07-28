import axiosClient from "./axiosClient";

const userApi = {
  getAll: (params) => {
    const url = "/user";
    return axiosClient.get(url, { params });
  },

  get: (id) => {
    const url = `/user/${id}`;
    return axiosClient.get(url);
  },

  create: (data) => {
    const url = `/user/`;
    return axiosClient.post(url, data);
  },

  update: (userId, data) => {
    const url = `/user/${userId}`;
    return axiosClient.patch(url, data);
  },

  delete: (userId) => {
    const url = `/user/${userId}`;
    return axiosClient.delete(url);
  },
};

export default userApi;
