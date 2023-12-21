
// ********************** Express *********************
var express = require('express') ; //   , http = require('http');

// express 프레임워크를 통해 app라는 웹서버 인스턴스(?)를 생성
var app = express() ; // ,server = http.createServer(app);

// express 프레임워크의 get 이라는 메소드를 통해 진짜~ DocumentRoot에 
// 해당되는 / 경로를 function()을 통해 'MQTT Hello world' 라는 문자열을 보내는 것을 알 수 있다. 
app.get('/', function(req, res) {
    //res.send('MQTT Hello world');
    // 이 문자열에 HTML TAG를 다음과 같이 추가할 수 있다. 해당 문장을 수정해보자.
    res.send('<H2>MQTT Hello World !</h2>');
});

//app.listen(3000, ()=> console.log('3000번 포트 대기'));

// app.listen(3000,function () {
//   console.log('3000번 포트 대기');
// });
 

// ********************** aedes ***********************

const aedes = require('aedes')()
const fs = require('fs');
const { createServer } = require('aedes-server-factory')
//const mqttBroker = require('net').createServer(aedes.handle); //0823 //
const port = 8888
const port2 = 8882
 
// ********************** MariaDB *********************
/* const mysql = require("mysql2");
const conn = {
 
  host: "127.0.0.1",  //"localhost", 
  port: "3306", 
  user: "root",
  password: "Jeresfarm1*",
  database: "farmdb", 
};
 
let connection = mysql.createConnection(conn);
connection.connect();
sql = "SELECT*FROM farmtbl"; 
connection.query(sql, function (err, results, fileds) {
  if (err) {
    console.log(err);
  }
  console.log(results);
 
});
connection.end(); */

// *****************************************************

// ********************** aedes ************************
// const httpServer = createServer(aedes, { ws: true })
// httpServer.listen(port, function () {
//   console.log('websocket server listening on port ', port)
// });   
//######## 모바일용 ################ 
// const path = require('path');
const option = {
      key: fs.readFileSync('./RSA-privkey.pem'),
      cert: fs.readFileSync('./RSA-cert.pem'),
      ca: fs.readFileSync('./RSA-chain.pem'),
}
const httpsServer = require('https').createServer(option);
const ws = require('websocket-stream');

ws.createServer({ server: httpsServer }, aedes.handle)
httpsServer.listen(port, function () {
    console.log('websocket server listening on port ', port)
});
//###################################
 
//############ PC 용 ################
const options = {
  key: fs.readFileSync('./privkey.pem'),
  cert: fs.readFileSync('./cert.pem')
}
const server = require('tls').createServer(options, aedes.handle)
//const server = createServer(options, aedes.handle)

server.listen(port2, function () {
  console.log('server started and listening on port ', port2)
});
//############ PC 용 ################
 
// httpServer.send('received from client');

aedes.on('client', function (client) {
        console.log('Client Connected: \x1b[33m' + (client ? client.id : client) + '\x1b[0m', 'to broker', aedes.id)
});

aedes.on('subscribe', function (subscriptions, client) {
        console.log('MQTT client \x1b[32m' + (client ? client.id : client) +
             '\x1b[0m subscribed to topics: ' + subscriptions.map(s => s.topic).join('\n'), 'from broker', aedes.id)
});

aedes.on('publish', async function (packet, client) {
         console.log('Client \x1b[31m' + (client ? client.id : 'BROKER_' + aedes.id) + '\x1b[0m has published', packet.payload.toString(), 'on', packet.topic, 'to broker', aedes.id)

         console.log(packet.payload[0] + " : " + packet.payload[1] );
    });

// ***** 로그인 체크 **************************
//authenticate the connecting client  임시막음
aedes.authenticate = (client, username, password, callback) => {
        console.log("ID:" + username + " : PW:" + password);
        password = Buffer.from(password, "base64").toString();
        if (username === "testuser" && password === "testpass") {
            return callback(null, true);
        }
        const error = new Error(
            "Authentication Failed!! Invalid user credentials."
        );
        console.log("Error ! Authentication failed.");
        return callback(error, false);
};
// *********************************************
 