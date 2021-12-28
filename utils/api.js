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
// ------------------------------------------------
// common api
// ------------------------------------------------

function getApi(path, query, config) {
  let queryString = query;
  if (query && typeof query === "object") {
    queryString = Object.keys(query)
      .map((v) => `${v}=${query[v]}`)
      .join("&");
  }
  const url = `/api${path}${queryString ? `?${queryString}` : ""}`;
  return axios.get(url, config);
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

function postApi(path, body, config) {
  const url = `/api${path}`;
  return axios.post(url, body, config);
}

// ------------------------------------------------
// sign api
// ------------------------------------------------

function getSignApi(path, query, config) {
  let queryString = query;
  if (query && typeof query === "object") {
    queryString = Object.keys(query)
      .map((v) => `${v}=${query[v]}`)
      .join("&");
  }
  const url = `/sign${path}${queryString ? `?${queryString}` : ""}`;
  return axios.get(url, config);
}

function postSignApi(path, body, config) {
  const url = `/sign${path}`;
  return axios.post(url, body, config);
}

export default {
  sendApi,
  postApi,
  getApi,
  getSignApi,
  postSignApi,
};
