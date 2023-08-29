import axios from "axios";

let BaseApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000/api"
});

let Api = function() {
  let token = localStorage.getItem("token");

  if (token) {
    BaseApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return BaseApi;
};

export default Api;
