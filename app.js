const express = require("express");
const app = express();
const {
  handleRootRequest,
  handleDataRequest,
  handleJsonStyleRequest,
  handleJsonDataRequest,
} = require("./mod/routes"); // 라우팅 핸들러 모듈 가져오기

const port = 8080;

// 정적 파일을 불러오기 위한 미들웨어 설정
app.use(express.static("public"));

// JSON 파싱을 위한 미들웨어 설정
app.use(express.json());

// 루트 경로로 접근했을 때 index.html 파일 전송
app.get("/", handleRootRequest);

// POST 요청으로 메세지 전달
app.post("/send", handleDataRequest);

// data.json 파일 전송
app.get("/json-data", handleJsonDataRequest);

//style.json 파일 전송
app.get("/json-style", handleJsonStyleRequest);

app.listen(port, function () {
  console.log(`http://127.0.0.1:${port}`);
});