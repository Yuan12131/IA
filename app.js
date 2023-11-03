import express from 'express'; // ESM 방식으로 express 불러오기

const app = express();

// 포트번호
const port = 8080;

// 정적 파일 요청 -> 미들웨어 함수
app.use(express.static('public'));

import { handleRootRequest } from "../mod/routes.mjs";
// 루트 경로 GET 요청 index.html 파일 전송
app.get('/', handleRootRequest);

app.listen(port, function () {
  console.log(`http://127.0.0.1:${port}`);
});