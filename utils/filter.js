import Vue from 'vue';
import format from './format';
import common from './common';


Vue.filter('categoryNames', (categoryCodeList, categoryList) => categoryCodeList
  .map((categoryCode) => {
    const { categoryName } = categoryList.find((category) => category.categoryCode === categoryCode) || {};
    return categoryName;
  })
  .filter((value) => value)
  .join(', '));

Vue.filter('areaNames', (areaCodeList, areaList) => areaCodeList
  .map((areaCode) => {
    const { areaName, scope, parentName } = areaList.find((area) => area.areaCode === areaCode) || {};
    if (scope === 'city'){
      return `${areaName}, ${parentName}`;
    } else{
      return areaName;
    }
  })
  .filter((value) => value)
  .join(', '));

Vue.filter('policyNames', (policy) => {
  if (!policy) {
    // return '예약대기';
    return '';
  } else if (policy.today_usable) {
    // return '당일사용가능';
    return '당일사용';
  } else if (policy.instant_confirmation) {
    return '즉시확정';
  } else if (policy.not_instant_voucher) {
    return '예약대기';
  }
  return '';
});

//가격표시필터
Vue.filter('price', ({ disp, repr }, opt) => {
  let price = repr;
  if (!opt || opt === 'normal') { // 정상가
    price = disp || repr;
  } else if (!opt || opt === 'discount') { // 할인가
    price = repr;
  } else if (opt === 'card') { // 현대카드할인(5%)
    price = common.percentPrice(price, 5);
  } else if (opt === 'point') { // 현대카드+M포인트할인(5% + 10%)
    price = common.mPointPrice(common.percentPrice(price, 5), 10);
  }
  return format.numberFormat(price);
});

//가격상세표시필터
// disp: 원래가격
// repr: 할인가격
Vue.filter('priceDetail', ({ dc_type, disp, repr }) => {
  let discountName = '';
  const normalPrice = disp || repr;
  const maxSalePrice = common.percentPrice(common.percentPrice(repr, 5), 10);
  if (dc_type === 'number') {
    const price = normalPrice - maxSalePrice;
    discountName = `-${format.numberFormat(price)}원`;
  } else if (dc_type === 'percent') {
    const percent = (normalPrice - maxSalePrice) / normalPrice * 100;
    discountName = `${format.numberFormat(percent)}%`;
  } else {
    const price = normalPrice - maxSalePrice;
    discountName = `-${format.numberFormat(price)}원`;
  }
  return discountName;
});

Vue.filter('currency', (number) => {
  return `${format.numberFormat(number)}원`;
});

Vue.filter('currencyNoWon', (number) => {
  return `${format.numberFormat(number)}`;
});

Vue.filter('parseHtml', (html, className) => {
  let result = '';
  const words = html.split('<br>');
  result = words.map((word, i) => {
    let p = word;
    if (i === 0 && word.indexOf('<p>') > -1) {
      p = p.slice(3);
    } else if (i === words.length - 1 && word.indexOf('</p>') > -1) {
      p = p.slice(0, -4);
    }
    p = className ? `<p class="${className}">${p}</p>` : `<p>${p}</p>`;
    return p;
  });
  return result.join('');
});
