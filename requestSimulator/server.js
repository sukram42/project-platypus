/**
 * Created by boebel on 28.09.2017.
 */

const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const log4js = require('log4js');

const requests = require('./server/request');


var env = process.env.NODE_ENV || 'development';
const config = require('./config')[env];

log4js.configure(config.log);
const logger = log4js.getLogger('datalog', 'console');


const port = process.env.PORT || config.requests.port || '3002';
app.set('port', port);

// Parsers for POST data
// app.use(log4js.connectLogger(logger, {level: log4js.levels.INFO}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.get('/requests',(req,res)=>{
    let element ={amount: requests.getRequests(), requesting: requests.isRequesting()}
    res.status(200).send(element);
});

app.post('/requests',(req,res)=>{
    logger.debug(req.body);
    let amount = req.body.amount;
    if(amount){
        res.status(200).send(requests.setRequests(amount));
    }else
        res.status(200).send("wrong entry");
});
app.post('/requests/start',(req,res)=>{
    let amount = req.body.amount;
    if(amount){
        res.status(200).send(requests.startRequesting());
    }
});

app.post('/requests/stop',(req,res)=>{
    let amount = req.body.amount;
    if(amount){
        res.status(200).send(requests.stopRequesting());
    }
});

app.get('/*',(req,res)=>{
    res.status(200).send("REQUEST API reachable");
});


const server = http.createServer(app);
server.listen(port, () => logger.info(`RequestAPI running on localhost:${port}`));
