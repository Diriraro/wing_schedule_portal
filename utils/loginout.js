let store;
let device = {};
if (process.browser) {
  window.onNuxtReady(({ $device, $store }) => {
    // console.log('privia.js onNuxtReady()    ------------------------------');
    device = $device;
    store = $store;
  });
}

/* getCookie */
const getCookie = (name) => {
  if (!process.browser || !window) {
    console.log("The window does not exist yet.");
    return "";
  }

  var dc = window.document.cookie || "";
  var prefix = name + "=";
  var begin = dc.indexOf("; " + prefix);

  if (begin == -1) {
    begin = dc.indexOf(prefix);
    if (begin != 0) {
      return null;
    }
  } else {
    begin += 2;
  }

  var end = dc.indexOf(";", begin);
  if (end == -1) {
    end = dc.length;
  }

  var val = unescape(dc.substring(begin + prefix.length, end));
  if (val === '""' || val === '""') val = "";
  // console.log(`${prefix}${val}`);
  return val;
};

/* setCookie */
const setCookie = (name, value, expiredays) => {
  if (!process.browser || !window) {
    console.log("The window does not exist yet.");
    return;
  }
  var today = new Date();
  today.setDate(today.getDate() + expiredays);
  window.document.cookie =
    name +
    "=" +
    escape(value) +
    "; expires=" +
    today.toGMTString() +
    "; path=/";
};

/* _loginFormSubmit */
const _loginFormSubmit = (goUrl, returnUrl, isMobile = device.isMobile) => {
  try {
    if (!returnUrl) {
      returnUrl = `${window.location.origin}/main`;
    }
    console.log(`_loginFormSubmit returnUrl: ${returnUrl}`);

    if (document.getElementById("tnaLoginForm")) {
      document.getElementById("tnaLoginForm").remove();
    }
    const inputKey = isMobile ? "MTRAVEL" : "";
    const formElement = document.createElement("form");
    formElement.id = "tnaLoginForm";
    formElement.method = "post";
    formElement.action = `${domainUrl(goUrl, isMobile)}`;
    console.log(`tnaLoginForm action: ${formElement.action}`);
    formElement.target = "_self";
    const obj = {
      returnUrl: returnUrl,
      key: inputKey,
    };
    Object.keys(obj).forEach((key) => {
      const inputElement = document.createElement("input");
      inputElement.setAttribute("type", "hidden");
      inputElement.setAttribute("name", key);
      inputElement.setAttribute("value", obj[key]);
      formElement.appendChild(inputElement);
    });
    document.body.appendChild(formElement);
    formElement.submit();
  } catch (e) {
    console.log(e);
  }
};

/* goLoginOrderPage */
const goLoginOrderPage = (returnUrl, isMobile = device.isMobile) => {
  if (process.env.isLocalTest) {
    // TODO 테스트용. 주석처리 필요!
    console.info("LOCAL TEST 코드 실행! --- goLoginOrderPage");
    if (location.protocol === "http:") {
      location.href = returnUrl;
      return;
    }
  }

  _loginFormSubmit("/common/sso/loginOrder", returnUrl, isMobile);
};

/* goLogout */
const goLogout = () => {
  _loginFormSubmit("/common/sso/logout", `${window.location.origin}/main`);
};

export default {
  getCookie,
  setCookie,
  goLoginOrderPage,
  goLogout,
};
