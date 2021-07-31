import axiosClient from "./axiosClient";

const employeeApi = {
  login: (data) => {
    const url = `/employee/login`;
    return axiosClient.post(url, data);
  },

  getAll: (params) => {
    const url = "/employee";
    return axiosClient.get(url, { params });
  },

  get: (id) => {
    const url = `/employee/${id}`;
    return axiosClient.get(url);
  },

  create: (data) => {
    const url = `/employee/`;
    return axiosClient.post(url, data);
  },

  update: (employeeId, data) => {
    const url = `/employee/${employeeId}`;
    return axiosClient.patch(url, data);
  },

  delete: (employeeId) => {
    const url = `/employee/${employeeId}`;
    return axiosClient.delete(url);
  },
};

export default employeeApi;
