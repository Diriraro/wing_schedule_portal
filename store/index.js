export const state = () => ({
  sessionId: "",
  userInfo: { memberNo: "", userName: "", socialDivn: "", memberId: "" },
  alertInfo: null,
  categoryList: [], // default.vue 1번 호출
  recomKeywordList: [], // default.vue 1번 호출
  recomAreaList: [], // default.vue 1번 호출
  serializedAreaList: [],
  productPolicyMap: {
    instant_confirmation: {
      policy: "instant_confirmation",
      name: "즉시확정",
      desc: "예약 후 확정 과정 없이 결제시 확정 되는 상품",
    },
    not_instant_voucher: {
      policy: "not_instant_voucher",
      name: "예약대기",
      desc: "예약 후 운영자의 확정이 필요한 상품",
    },
    today_usable: {
      policy: "today_usable",
      // name: '당일사용가능',
      name: "당일사용",
      desc: "구매한 당일 바로 사용 가능한 상품",
    },
  },
  objPopup: {
    fullLoading: { show: false, data: {} }, // 전체로딩화면
    noticePopup: { show: true, data: {} },
    filterPopup: { show: false, data: {} },
    pricePopup: { show: false, data: {} },
    optionInputPopup: { show: false, data: {} },
    useTermsPopup: { show: false, data: {} },
    voucherPopup: { show: false, data: {} },
    imagePopup: { show: false, data: {} },
    sharePopup: { show: false, data: {} },
    optionDetailPopup: { show: false, data: {} },
    greenVoucherPayPopup: { show: false, data: {} },
    redVoucherPayPopup: { show: false, data: {} },
    ticketPayPopup: { show: false, data: {} },
    couponPayPopup: { show: false, data: {} },
    mpointPopup: { show: false, data: {} },
    certificationGuidePopup: { show: false, data: {} },
    safePayGuidePopup: { show: false, data: {} },
    safeChoicePopup: { show: false, data: {} },
    agreeContPopup: { show: false, data: {} },
    thirdPartyConsentPopup: { show: false, data: {} },
    confirmHccCardPopup: { show: false, data: {} },
    reserveConfirmOptionDetailPopup: { show: false, data: {} },
    optionConfirmPopup: { show: false, data: {} },
    inquireCreatePopup: { show: false, data: {} },
    inquireDetailPopup: { show: false, data: {} },
    mobileMypagePaymentPopup: { show: false, data: {} },
    mypageVoucherPopup: { show: false, data: {} },
    mobileInquireCreatePopup: { show: false, data: {} },
    mobileImgBig: { show: false, data: {} },
    mobileVoucherIframe: { show: false, data: {} },
  },
  popupStack: [],
});

export const getters = {
  peekPopupStack() {
    const top =
      state.popupStack.length > 0
        ? { ...state.popupStack[state.popupStack.length - 1] }
        : null;
    console.log(`peekPopupStack  ${top}`);
    return top;
  },
  parentPopupModalId(id) {
    if (state.popupStack.length > 0) {
      for (let i = state.popupStack.length - 1; i === 0; i -= 1) {
        if (state.popupStack[parentPopupModalId].id === id) {
          console.log(`parentPopupModalId  ${state.popupStack[i].parent}`);
          return state.popupStack[i].parent;
        }
      }
    }
    console.log("parentPopupModalId  body");
    return "body";
  },
};

export const mutations = {
  setSessionId(state, value) {
    state.sessionId = value;
  },
  setUserInfo(state, data) {
    // socialDivn : 소설 로그인 타입 (NAVER: 네이버, F: 페이스북, T: 트위터, K: 카카오, A: 애플)
    // memberNo: 회원번호. 값 존재 여부로 회원 로그인 여부 판단.
    const defaultInfo = {
      memberNo: "",
      userName: "",
      socialDivn: "",
      memberId: "",
    };
    state.userInfo = {
      ...defaultInfo,
      ...data,
    };
  },
  openAlert(state, value) {
    state.alertInfo = value;
  },
  setCategoryList(state, value) {
    state.categoryList = value || [];
  },
  setRecomKeywordList(state, value) {
    state.recomKeywordList = value || [];
  },
  setRecomAreaList(state, value) {
    state.recomAreaList = value || [];
  },
  setSerializedAreaList(state, value) {
    state.serializedAreaList = value;
  },
  setProductPolicyMap(state, value) {
    state.productPolicyMap = {
      ...state.productPolicyMap,
      ...value,
    };
  },
  setPopupShow(state, { key, flag, data }) {
    state.objPopup[key].show = flag;
    state.objPopup[key].data = data || {};

    // if (process.browser) { // 스크롤이 제일 위로 올라가서 막음
    //   try {
    //     if (flag) {
    //       document.documentElement.classList.add('no_scroll'); // html
    //       document.body.classList.add('no_scroll');
    //     } else {
    //       document.documentElement.classList.remove('no_scroll');
    //       document.body.classList.remove('no_scroll');
    //     }
    //   } catch(e) {
    //     console.log(e);
    //   }
    // }
  },
  pushPopupStack(state, value) {
    console.log(`pushPopupStack  ${value}`);
    const top =
      state.popupStack.length > 0
        ? state.popupStack[state.popupStack.length - 1]
        : null;
    const parent = top ? top.id : "body";
    const level = top ? top.level + 1 : 0;
    state.popupStack.push({ id: value, parent, level });
  },
  popPopupStack(state, value) {
    console.log(`popPopupStack  ${value}`);
    // 같은 팝업에서 2번 호출될 수 있음. close 와 beforeDestroy 에서 1번씩.
    const top =
      state.popupStack.length > 0
        ? state.popupStack[state.popupStack.length - 1]
        : null;
    if (top && top.id === value) {
      console.log(`popPopupStack pop OK!   ${top}`);
      state.popupStack.pop();
    } else {
      console.log(`popPopupStack error : pop 할 팝업이 아님!  top ${top}`);
    }
  },
};

export const actions = {
  async nuxtServerInit({ commit }, { req, app, error }) {
    console.log(); // 로그 빈공간.
    console.log();
    console.log("==========================================================");
    console.log("store nuxtServerInit -------------------------------------");
    console.log(
      `req.url : ${req.url}    host: ${
        req.headers && req.headers.host ? req.headers.host : "unknown"
      }  origin: ${
        req.headers && req.headers.origin ? req.headers.origin : "unknown"
      }`
    );
    // 디바이스 찍기!  isMobile, isMobileOrTablet, isTablet, isDesktop, isIos, isAndroid, isWindows, isMacOS, isDesktopOrTablet
    try {
      const deviceStr = Object.keys(app.$device)
        .filter((key) => app.$device[key])
        .join(", ");
      console.log(`device info : ${deviceStr}`);
    } catch (e) {
      /* nothinh */
    }
    console.log("==========================================================");
  },
  openLayerPopup({ commit }, { popName, data }) {
    // console.log('vuex openLayerPopup');
    // commit('pushPopupStack', `modal-popup-${popName}`);
    commit("setPopupShow", { key: popName, flag: true, data });
  },
  closeLayerPopup({ commit }, popName) {
    // console.log('vuex closeLayerPopup');
    // commit('popPopupStack', `modal-popup-${popName}`);
    commit("setPopupShow", { key: popName, flag: false });
  },
};
