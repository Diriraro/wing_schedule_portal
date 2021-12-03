const axios = require("axios");
const express = require("express");
const timeout = require("connect-timeout");

// express 인스턴스 생성
const app = express();

app.use(timeout("10s")); // api 10초 타임아웃 설정

// 실제로는 /api 라우트를 처리하는 메소드가 된다.
app.post("/", function (req, res) {
  res.send("API root");
});

// dev url
let url = "localhost:19490";

// api 샘플 (/api/sample 로 접근)
// app.post("/sample", (req, res) => {
//   console.log(req.body);
//   res.status(200).send();
//   axios
//     .post("--", {
//       a: 10,
//       b: 999,
//     })
//     .then((resp) => {
//       res.status(200).send(resp);
//     });
// });

/* Sample
// /api/log
app.post('/log', (req, res) => {
  console.log(req.body);
  res.status(200).send();
});

// Import API Routes
app.use('/test', require('./test'));  // /api/test.js  사용시
*/

// 모듈로 사용할 수 있도록 export
// 앱의 /api/* 라우트로 접근하는 모든 요청은 모두 app 인스턴스에게 전달된다.
module.exports = {
  path: "/api",
  handler: app,
};
