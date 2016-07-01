var express = require('express');
var cons = require('consolidate');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var wsServer = require('ws').Server
var app = express();

//CONFIG
app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
    
//ws Streaming function
var wss = new wsServer({ port: 8001 });
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    client.send(data);
  });
};

//ws Actions
wss.on('connection', function(ws) {
    console.log('New client connected.');
    //Return data to ws straming
    ws.on('message', function(data, flags) {
        wss.broadcast(JSON.stringify({"v":data}));
        console.log({"v":data});
    });
});

app.get('/', function(req, res) {
    res.render('inicio');
});

app.listen(8002);
console.log('APP RUNNING ON 8002')
      