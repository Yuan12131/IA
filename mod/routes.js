const express = require("express");
const http = require('http'); 

const router = express.Router();


router.get("/", (req, res) => {
  res.sendFile(__dirname + "../public/index.html"); // 루트 경로 처리 로직
});

router.post("/data", (req, res) => {

  // http.get("/data", options, res => {
    let data = '';

    res.on('data', chunk => {
      data += chunk;
    });

    res.on('end', () => {
      res.writeHead(200, { 'Content-Type': 'text/json;charset=utf-8' });
      res.end(data);
    });
  // });
});

module.exports = { handleRootRequest: router.get("/"), handleDataRequest: router.post("/data") };
