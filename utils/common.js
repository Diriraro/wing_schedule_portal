import moment from "moment";

let store;
let apis;
let router;
let isInicisLoaded = false;

if (process.browser) {
  window.onNuxtReady(({ $store, $apis, $router }) => {
    store = $store;
    apis = $apis;
    router = $router;
  });
}

/* log error */
const logError = (error) => {
  if (error.response) {
    // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
    console.log(`${error.response.status} ${error.response.statusText}`);
    console.log(error.response.data);
    // console.log(error.response.headers);
  } else if (error.request) {
    // 요청이 이루어 졌으나 응답을 받지 못했습니다.
    // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
    // Node.js의 http.ClientRequest 인스턴스입니다.
    console.log(error.request);
  } else {
    // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
    console.log("Error", error.message);
  }
  // console.log(error.config);
};

/* alert */
const alert = (msg, callback) => {
  store.commit("openAlert", {
    text: msg,
    arrBtn: [{ text: "확인", event: callback }],
  });
};

/* asyncAlert */
const asyncAlert = (msg) =>
  new Promise((resolve) => {
    store.commit("openAlert", {
      text: msg,
      arrBtn: [
        {
          text: "확인",
          event: () => {
            resolve(true);
          },
        },
      ],
    });
  });

/* confirm */
const confirm = (msg, okCallback, cancelCallback) => {
  store.commit("openAlert", {
    text: msg,
    arrBtn: [
      { text: "확인", event: okCallback },
      { text: "취소", event: cancelCallback },
    ],
  });
};

/* asyncConfirm */
const asyncConfirm = (msg) =>
  new Promise((resolve) => {
    store.commit("openAlert", {
      text: msg,
      arrBtn: [
        {
          text: "확인",
          event: () => {
            resolve(true);
          },
        },
        {
          text: "취소",
          event: () => {
            resolve(false);
          },
        },
      ],
    });
  });

/* copyObject */
function copyObject(object) {
  const targetObject = object;
  let copiedObject = {};
  if (Array.isArray(targetObject)) {
    copiedObject = targetObject.map(copyObject);
  } else if (typeof targetObject === "object") {
    for (const key in targetObject) {
      if (Array.isArray(targetObject[key])) {
        copiedObject[key] = targetObject[key].map(copyObject);
      } else if (typeof targetObject[key] === "object") {
        copiedObject[key] = copyObject(targetObject[key]);
      } else {
        copiedObject[key] = targetObject[key];
      }
    }
  } else {
    copiedObject = targetObject;
  }
  return copiedObject;
}

/* deserializeSearchOption */
function deserializeSearchOption(queryObject) {
  const excludeKeys = ["category_ids", "area_ids", "provider_ids", "policies"];
  const splitPairs = (queryObject) => {
    const pairs = [];
    for (const key in queryObject) {
      pairs.push({ key, value: queryObject[key] });
    }
    return pairs;
  };
  const queryToObject = ({ key, value }) => {
    const obj = {};
    if (excludeKeys.includes(key)) {
      obj[key] =
        (value &&
          value.split(",").map((id) => {
            const numberId = Number(id);
            return isNaN(numberId) ? id : numberId;
          })) ||
        undefined;
      return obj;
    }
    if (key.includes("_")) {
      const [pKey, sKey] = key.split("_");
      obj[pKey] = {};
      obj[pKey][sKey] = value;
      return obj;
    } else {
      const obj = {};
      obj[key] = value;
      // console.log(key);
      return obj;
    }
  };

  const mergeObject = (mergeObj, obj) => {
    const convertValue = (value) => {
      if (!value || Object.keys(value).length === 0) {
        return "";
      }
      if (value == "true") {
        return true;
      }
      if (value == "false") {
        return false;
      }
      if (!isNaN(Number(value))) {
        return Number(value);
      }
      return value;
    };
    for (const key in obj) {
      if (
        typeof obj[key] === "object" &&
        !Array.isArray(obj[key]) &&
        obj[key]
      ) {
        if (!mergeObj[key]) mergeObj[key] = {};
        for (const subKey in obj[key]) {
          mergeObj[key][subKey] = convertValue(obj[key][subKey]);
        }
      } else if (excludeKeys.includes(key)) {
        mergeObj[key] = obj[key] || [];
      } else {
        mergeObj[key] = convertValue(obj[key]);
      }
    }
    return mergeObj;
  };
  return splitPairs(queryObject).map(queryToObject).reduce(mergeObject, {});
}

/* getUID */
function getUID(vueInstance) {
  return vueInstance._uid;
}

/* matchEmail */
function matchEmail(value) {
  return /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
    value
  );
}

/* openLayerPopup */
const openLayerPopup = (popName, data) => {
  store.dispatch("openLayerPopup", { popName, data });
};

/* closeLayerPopup */
const closeLayerPopup = (popName) => {
  if (store) {
    // mounted 되기전 beforeDestroy 시 에러남 방지.
    store.dispatch("closeLayerPopup", popName);
  }
};

/* parseNumber */
const parseNumber = (num) => {
  let retNum = num;
  if (!retNum) return 0;
  if (typeof retNum === "number") return retNum;
  if (typeof retNum === "string") {
    retNum = retNum.replace(/,\s*$/, "");
    if (retNum.indexOf(".") !== -1) {
      retNum = Number.parseFloat(retNum);
    } else {
      retNum = Number.parseInt(retNum, 10);
    }
  }
  if (Number.isNaN(retNum)) return 0;
  return retNum;
};

/* isNumberStr : 숫자 또는 숫자형식의 문자열 이면 true */
const isNumberStr = (str) => {
  if (!str) return false;
  return !/[^0-9]/.test(String(str));
};

/* fullLoading */
const fullLoading = (show = true) => {
  if (show === true || show === "loading") {
    openLayerPopup("fullLoading");
  } else {
    closeLayerPopup("fullLoading");
  }
};

/* goErrorPageAndAlert */
const goErrorPageAndAlert = (message = "오류가 발생하였습니다.") => {
  window.$nuxt.error({ statusCode: 406, message: message }); // 에러 메시지 alert 후 전 화면 가기
};

/* goBack */
const goBack = () => {
  if (store.state.history.arrHistory.length > 0) {
    const backUrl =
      store.state.history.arrHistory[store.state.history.arrHistory.length - 1];
    console.log(`back() backUrl: ${backUrl}`);
    store.commit("history/popHistory");
    router.back();
  } else {
    console.log("back() goMain: /main");
    router.push("/main");
  }
};

/* getLocalMoment
- utc 날짜를 로컬 날짜로 반환
- {{ $common.getLocalMoment('2021-07-23T02:40:48.852+00:00', 'format') }} => 2021-07-23 11:40:48
*/
const getLocalMoment = (
  utcString,
  returnType = "moment",
  format = "YYYY-MM-DD HH:mm:ss"
) => {
  // console.log(`getLocalMoment    utcString: ${utcString}   returnType: ${returnType}`);
  if (returnType === "moment") {
    // console.log(`getLocalMoment    local date: ${moment.utc(utcString).local()}`);
    return moment.utc(utcString).local();
  } else {
    // returnType 'format'
    // console.log(`getLocalMoment    local format: ${moment.utc(utcString).local().format(format)}`);
    return moment.utc(utcString).local().format(format);
  }
};

const nvlStr = (str, defaultValue = "") => {
  if (!str || str === null || str === "null") return defaultValue;
  return str;
};

export default {
  logError,
  alert,
  confirm,
  asyncConfirm,
  copyObject,
  deserializeSearchOption,
  getUID,
  matchEmail,
  openLayerPopup,
  closeLayerPopup,
  parseNumber,
  isNumberStr,
  fullLoading,
  goErrorPageAndAlert,
  goBack,
  getLocalMoment,
  asyncAlert,
  nvlStr,
};
