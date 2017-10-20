// Get dependencies


const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const log4js = require('log4js');

const jmeterInterface = require('./jmeterInterface');

const config = require('./config');

log4js.configure(config.log);
const logger = log4js.getLogger('datalog', 'console');

process.on('uncaughtException', (err) => {
 logger.error(err);
});


// Parsers for POST data
app.use(log4js.connectLogger(logger, {level: log4js.levels.INFO}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


const port = config.port || '3005';
app.set('port', port);

app.route('/startScript').get(jmeterInterface.isTestStarted)
                         .post(jmeterInterface.startTest)
                         .delete(jmeterInterface.stopProcess);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.send('No such endpoint');
});


const server = http.createServer(app);
server.listen(port, () => logger.info(`API running on masterServer on Port: ${port}`));
server.on('error', (err) => {
  logger.error("Error",err);
});

