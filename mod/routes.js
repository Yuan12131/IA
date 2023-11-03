const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(__dirname + '../public/index.html')// 루트 경로 처리 로직
});

module.exports = { handleRootRequest: router.get('/') };