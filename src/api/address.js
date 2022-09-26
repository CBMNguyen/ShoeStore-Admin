import axiosClient from "./axiosClient";

const addressApi = {
  getByUserId: (userId) => {
    const url = `/address/${userId}`;
    return axiosClient.get(url);
  },
};

export default addressApi;
