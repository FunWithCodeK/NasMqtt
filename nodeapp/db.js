const express = require("express");  // 서버를 띄우기 위한 기본세팅( express 라이브러리 )
const WebsocketServer = require("ws");
// const indexRouter = require("./routes/index.js");
// const userRouter = require("./routes/users.js");
const app = require("express")();  // 객체 생성
const aedes = require("aedes")(); //MQTT aedes nodejs module 
const mysql = require("mysql");
const { createServer } = require("aedes-server-factory");

const server = require('net').createServer(aedes.handle)
const port = 8001;
//cafe24 mysql db 접속
const conn = {
 
  host: "127.0.0.1",  //"localhost", 
  port: "3306", 
  user: "root",
  password: "jeresfarm123!",
  database: "farmdb", 
};

let connection = mysql.createConnection(conn);
connection.connect();
sql = "SELECT * FROM farmtbl"; 
connection.query(sql, function (err, results, fileds) {
  if (err) {
      console.log(err);
  }
  console.log(results);
 
});
connection.end();