/*
  10 미만의 수이면 앞에 0을 붙여서 리턴하는 함수.
  n = 9 -> '09'
*/
function zeros(n) {
  const length = n.toString().length;
  return `${ length < 2 ? '0' : '' }${n}`;
}

/*
  YYYY-MM-DD 를 원하는 형식으로 변환하여 리턴하는 함수.
*/
function formatDate(ymd, type) {
  if (!ymd) {
    return '';
  }
  const split = ymd.split('-');
  let v = '';
  const dow = ['일', '월', '화', '수', '목', '금', '토'];
  switch (type) {
    case 'dot':
      v = `${parseInt(split[1], 10)}.${parseInt(split[2], 10)}`;
      break;
    case 'md':
      v = `${parseInt(split[1], 10)}월 ${parseInt(split[2], 10)}일`;
      break;
    case 'dow':
      v = dow[new Date(ymd).getDay()];
      break;
    case 'zerodot':
      v = `${this.zeros(parseInt(split[1], 10))}.${this.zeros(parseInt(split[2], 10))}`;
      break;
    case 'ko_ymd':
      v = `${split[0]}년 ${parseInt(split[1], 10)}월 ${parseInt(split[2], 10)}일`;
      break;
    default:
      v = ymd;
  }
  return v;
}

/*
  date 형식을 YYYY-MM-DD 형식으로 리턴하는 함수
*/
function ymdDate(d) {
  return `${d.getFullYear()}-${zeros(d.getMonth() + 1)}-${zeros(d.getDate())}`;
}

/*
  전화번호가 01012341234 형태일 경우
  010-1234-1234로 변환해주는 함수
*/
function formatPhone(num) {
  if (!num) {
    return '';
  }
  const arr = [];
  let etc = num.substr(3, num.length);
  if (num.substr(0, 2) === '02') {
    etc = num.substr(2, num.length);
    arr.push('02');
  } else {
    arr.push(num.substr(0, 3));
  }
  if (etc.length === 7) {
    arr.push(etc.substr(0, 3));
    arr.push(etc.substr(3, 4));
  } else if (etc.length >= 8) {
    arr.push(etc.substr(0, 4));
    arr.push(etc.substr(4, 4));
  }
  return arr.join('-');
}

function numberFormat(number) {
  if (!number) {
    return 0;
  }
  return Math.round(number).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function getBetweenDay(sdate, edate) {
  const strStart = `${sdate.toString().substr(0, 4)}-${sdate.toString().substr(5, 2)}-${sdate.toString().substr(8, 2)}`;
  const strEnd = `${edate.toString().substr(0, 4)}-${edate.toString().substr(5, 2)}-${edate.toString().substr(8, 2)}`;
  function getDateObj(strDate) {
    const dateArray = strDate.split('-');
    return new Date(dateArray[0], Number(dateArray[1]) - 1, dateArray[2]);
  }
  return (getDateObj(strEnd).getTime() - getDateObj(strStart).getTime()) / 86400000;
}

function formatPrice(price) {
  let numPrice = parseInt(price, 10);
  let cond = parseInt(numPrice / 10000, 10);
  let text = '';
  if (cond === 1) {
    text = '만';
  } else if (cond >= 1) {
    text = `${parseInt(cond, 10)}만`;
  }
  numPrice -= parseInt(numPrice / 10000, 10) * 10000;
  cond = parseInt(numPrice / 1000, 10);
  if (cond === 1) {
    text = '천';
  } else if (cond >= 1) {
    text += `${parseInt(cond, 10)}천`;
  }
  numPrice -= parseInt(numPrice / 1000, 10) * 1000;
  cond = parseInt(numPrice / 100, 10);
  if (cond === 1) {
    text = '백';
  } else if (cond >= 1) {
    text += `${parseInt(cond, 10)}백`;
  }
  numPrice -= parseInt(numPrice / 100, 10) * 100;
  if (numPrice) {
    text += numPrice;
  }
  if (!text) {
    text = `${numberFormat(parseInt(price, 10))}`;
  }
  return `${text}원`;
}

export default {
  zeros,
  formatDate,
  ymdDate,
  formatPhone,
  numberFormat,
  getBetweenDay,
  formatPrice,
};
