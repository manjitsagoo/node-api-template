const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const winston = require('winston');
const dateFormat = require('dateformat');
const version = require('./package.json');

const app = express();
app.use(morgan('combined'));
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

//POST 
router.post('/test', function (req, res) {
    var data = JSON.stringify(req.body);
    var date = Date.now();
    var message = "Received:" + data + " at " + dateFormat(date, "dddd, mmmm dS, yyyy, h:MM:ss TT");
     var obj = new Object(); 
     obj.date = Date.now();
     obj.message = message;
     winston.log('info',,"Receiced " + message);
     res.send(JSON.stringify(obj));
  })

//GET
router.get('/version', function (req,res) {
    var obj = new Object(); 
    obj.Version = version.version;
    obj.Env = process.env;
    winston.log('info',JSON.stringify(obj));
    res.send(JSON.parse(JSON.stringify(obj)));
});
   
//API
app.use('/api', router);
var port = process.env.PORT||3000;
var server = app.listen(port, function(){
    console.log('/api listening on port' + server.address().port);
});
