const express = require('express');
const app = express();
const { handleRootRequest, handleDataRequest } = require('./mod/routes'); // 라우팅 핸들러 모듈 가져오기

const port = 8080;

// 정적 파일을 불러오기 위한 미들웨어 설정
app.use(express.static('public'));

// 루트 경로로 접근했을 때 index.html 파일 전송
app.get('/', handleRootRequest); // 라우팅 핸들러로 변경

app.post('/send', handleDataRequest); // 라우팅 핸들러로 변경

app.listen(port, function () {
  console.log(`http://127.0.0.1:${port}`);
});