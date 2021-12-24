import axios from "axios";
import axiosCancel from "axios-cancel";

let store;
if (process.browser) {
  window.onNuxtReady(({ $store }) => {
    store = $store;
  });
}

axiosCancel(axios);

const CancelToken = axios.CancelToken;

axios.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

function postApi(path, body, config) {
  const url = `/api${path}`;
  return axios.post(url, body, config);
}

function sendApi(path, query, body) {
  const queryString =
    query && typeof query === "object"
      ? Object.keys(query)
          .map((v) => `${v}=${query[v]}`)
          .join("&")
      : "";
  const url = `/api${path}${queryString ? `?${queryString}` : ""}`;
  return axios.post(url, body);
}

export default {
  sendApi,
  postApi,
};
