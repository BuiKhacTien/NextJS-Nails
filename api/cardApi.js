
import axiosClient from "./axiosClient";

const cardApi = {
   all: () => {
      const url = `api/User/GetListCard`;
      return axiosClient.get(url);
   },
   add: (params) => {
      const url = `api/User/AddCard`
      return axiosClient.post(url, params)
   },
   update: (params) => {
      const url = `api/User/UpdateCard`
      return axiosClient.put(url, params)
   },
   delete: (id) => {
      const url = `api/User/DeleteCard/${id}`
      return axiosClient.delete(url)
   },
};

export default cardApi;
