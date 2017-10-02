const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const app = express();
const winston = require('winston');
const dateFormat = require('dateformat');
const version = require('./package.json');

winston.level = process.env.LOG_LEVEL;

app.use(cors({
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'origin': '*',
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
   }));

app.use(bodyParser.urlencoded({limit: '5mb',  extended: true }));
app.use(bodyParser.json({limit: '5mb'}));
var router = express.Router();

//save clients in database
app.post('/test', function (req, res) {
    var data = JSON.stringify(req.body);
    var message = "Received:" + data + " at " + dateFormat(date, "dddd, mmmm dS, yyyy, h:MM:ss TT");
    console.log(message);
     var obj = new Object(); 
     obj.date = Date.now();
     obj.message = message;
    res.send(JSON.stringify(obj));
  })


router.get('/version', function (req,res) {
    winston.log("info","GET /version");
    var obj = new Object(); 
    obj.Version = version.version;
    res.send(JSON.parse(JSON.stringify(obj)));
});
   

app.use('/api', router);
var port = process.env.PORT||3000;
var server = app.listen(port, function(){
	winston.log("info",'/api listening on ' + port);
});
