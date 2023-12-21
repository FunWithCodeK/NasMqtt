
var express = require('express'); 
 

const aedes = require('aedes')();
const mqttBroker = require('net').createServer(aedes.handle);
const mqttPort = 1883

// �� 
var app = express(); 
 

app.get('/', (req, res) => { 
  res.send('Hello world\n'); 
}); 
app.listen(3000, ()=> console.log('3000번 포트 대기'));

mqttBroker.listen(mqttPort, () => {
    console.log("MQTT broker listening", mqttPort);
});


//#############################
aedes.on('clientError', function (client, err) {
  console.log('client error', client.id, err.message, err.stack)
})

aedes.on('connectionError', function (client, err) {
  console.log('client error', client, err.message, err.stack)
})

aedes.on('publish', function (packet, client) {
  if (client) {
    console.log('message from client', client.id)
  }
})

aedes.on('subscribe', function (subscriptions, client) {
  if (client) {
    console.log('subscribe from client', subscriptions, client.id)
  }
})

aedes.on('client', function (client) {
  console.log('new client', client.id)
})

 
