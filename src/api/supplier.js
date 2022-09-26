import axiosClient from "./axiosClient";

const supplierApi = {
  getAll: (params) => {
    const url = "/supplier";
    return axiosClient.get(url, { params });
  },

  get: (id) => {
    const url = `/supplier/${id}`;
    return axiosClient.get(url);
  },

  create: (data) => {
    const url = `/supplier/`;
    return axiosClient.post(url, data);
  },

  update: (supplierId, data) => {
    const url = `/supplier/${supplierId}`;
    return axiosClient.patch(url, data);
  },

  delete: (supplierId) => {
    const url = `/supplier/${supplierId}`;
    return axiosClient.delete(url);
  },
};

export default supplierApi;
