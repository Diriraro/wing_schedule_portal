import Vue from "vue";
import axios from "axios";
import axiosCancel from "axios-cancel";
// import moment from 'moment';

let store;
let device;
if (process.browser) {
  window.onNuxtReady(({ $store, $device }) => {
    // console.log('api.js onNuxtReady() ------------------------------');
    store = $store;
    device = $device;
  });
}

// CORS 처리
// axios.defaults.baseURL = 'http://localhost:3000';
// axios.defaults.proxyHeaders = false;
axios.defaults.credentials = true; // for cookie
axiosCancel(axios);

const { CancelToken } = axios;

axios.interceptors.request.use(
  (config) =>
    // Do something before request is sent
    config,
  (error) => {
    // Do something with request error
    console.log("axios.interceptors.request", error);
    Promise.reject(error);
  }
);

// ------------------------------------------------
// tna api
// ------------------------------------------------

function sendApi(path, query, body) {
  let queryString = query;
  if (query && typeof query === "object") {
    queryString = Object.keys(query)
      .map((v) => `${v}=${query[v]}`)
      .join("&");
  }
  let url = `/api${path}${queryString ? `?${queryString}` : ""}`;
  if (path.indexOf("http") >= 0) {
    url = `${path}${queryString ? `?${queryString}` : ""}`;
  }
  return axios.post(url, body);
}

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

function postApi(path, body, config) {
  const url = `/api${path}`;
  return axios.post(url, body, config);
}

// ------------------------------------------------
// all api (axios.all 기능. 사용 주의!!)
// ------------------------------------------------

function allApi(arrApi) {
  return new Promise((resolve, reject) => {
    axios
      .all(arrApi)
      .then(
        axios.spread((...responses) => {
          const arrResp = [];
          for (let i = 0; i < arrApi.length; i += 1) {
            arrResp[i] = responses[i];
          }
          resolve(arrResp);
        })
      )
      .catch((errors) => {
        reject(errors);
      });
  });
}

// ------------------------------------------------
// secure api
// ------------------------------------------------

function getMemberInfo() {
  const url = `/common/secure/memberInfo`;
  return axios.get(url);
}

// ------------------------------------------------
// set store api
// ------------------------------------------------

function refreshCategoryList() {
  // getApi('/common/category').then((response) => {
  getApi("/setting/product-category").then((response) => {
    let categoryList = response.data;
    categoryList = categoryList.map((x) => {
      const y = x;
      y.categoryCode = x.category_id;
      y.categoryName = x.name;
      return y;
    });
    store.commit("setCategoryList", categoryList);
  });
}

function refreshRecomKeywordList() {
  getApi("/display/recom/keywords").then((response) => {
    store.commit("setRecomKeywordList", response.data);
  });
}

function refreshRecomAreaList() {
  getApi("/display/recom/areas").then((response) => {
    store.commit("setRecomAreaList", response.data);
  });
}

function refreshLoginInfo(refreshFlag = false) {
  return new Promise((resolve) => {
    Vue.nextTick(() => {
      const memberNo = priviaUtils.getCookie("memberNo");
      if (
        refreshFlag ||
        (memberNo && memberNo !== store.state.userInfo.memberNo)
      ) {
        getMemberInfo()
          .then((response) => {
            if (response.data) {
              // 꼭 필요한 정보만 넣는다. 회원정보가 필요하면 따로 getMemberInfo를 호출.
              // 현재 memberNo 존재 여부(로그인여부)와 userName, socialDivn, memberId 만 필요.
              const userInfo = {};
              userInfo.memberNo = memberNo || ""; // 암호화된 값
              userInfo.userName = response.data.memberNm || ""; // 복호화된 값
              userInfo.socialDivn = response.data.socialDivn || ""; // 복호화된 값
              userInfo.memberId = response.data.memberId || ""; // 복호화된 값
              store.commit("setUserInfo", userInfo);
              // console.log(`***** refreshLoginInfo set : ${JSON.stringify({...store.state.userInfo})}`);
              resolve({ ...store.state.userInfo });
            } else {
              store.commit("setUserInfo", {});
              // console.log(`***** refreshLoginInfo empty : ${JSON.stringify({...store.state.userInfo})}`);
              resolve({ ...store.state.userInfo });
            }
          })
          .catch((error) => {
            // console.log('***** refreshLoginInfo error : ', error);
            store.commit("setUserInfo", {});
            // console.log(`***** refreshLoginInfo empty : ${JSON.stringify({...store.state.userInfo})}`);
            resolve({ ...store.state.userInfo });
          });
      } else if (store.state.userInfo.memberNo) {
        // console.log(`***** refreshLoginInfo exists : ${JSON.stringify({...store.state.userInfo})}`);
        resolve({ ...store.state.userInfo });
      } else {
        store.commit("setUserInfo", {});
        // console.log(`***** refreshLoginInfo empty : ${JSON.stringify({...store.state.userInfo})}`);
        resolve({ ...store.state.userInfo });
      }
    });
  });
}

// ------------------------------------------------
// Generic url
// ------------------------------------------------

function get(url, config) {
  return axios.get(url, config);
}

function post(url, body, config) {
  return axios.post(url, body, config);
}

// ------------------------------------------------
// file api
// ------------------------------------------------

function postFileApi(path, body, config) {
  const url = `/file${path}`;
  return axios.post(url, body, config);
}

export default {
  sendApi,
  getApi,
  postApi,
  allApi,
  getMemberInfo,
  refreshCategoryList,
  refreshRecomKeywordList,
  refreshRecomAreaList,
  refreshLoginInfo,
  get,
  post,
  postFileApi,
};
