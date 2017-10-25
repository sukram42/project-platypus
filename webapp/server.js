/**
 * @file File to Setup Server
 * @type {*}
 */

const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const http2 = require('spdy');
const bodyParser = require('body-parser');
const log4js = require('log4js');
const fs = require('fs');

const httpMidware = require('./server/http_mid');

var env = process.env.NODE_ENV || 'development';
const config = require('./config')[env];


log4js.configure(config.log);
const logger = log4js.getLogger('datalog', 'console');

process.on('uncaughtException', (err) => {
 logger.warn(err);
});

const api = require('./server/api');


let files = {};
fs.readdir('dist', (error, data) => {

  data.forEach(name => {
    if (!fs.lstatSync(path.join(__dirname, 'dist', `${name}`)).isDirectory()) {
      files[`${name}`] = fs
        .readFileSync(path.join(__dirname, 'dist', `${name}`), {encoding: 'utf8'})
        .split('\n')
        .filter(line => line.match(/src *?= *?"(.*)"/) != null)
        .map(line => line.match(/src *?= *?"(.*)"/)[1])
    }
  })

})

const cert = fs.readFileSync(path.join(__dirname, config.certs.cert)),
  key = fs.readFileSync(path.join(__dirname, config.certs.key));

// Parsers for POST data
app.use(log4js.connectLogger(logger, {level: log4js.levels.INFO}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

//Set HTTP2 Midware
app.use(((request, response, next) => httpMidware.pushFiles(request, response, next, files)));

const port = process.env.PORT || config.server.port || '3000';
app.set('port', port);

// Set API routes
app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});


const server = http2.createServer({cert, key}, app);
server.listen(port, () => logger.info(`API running on localhost:${port}`));
server.on('error', (err) => {
  logger.error("Error",err);
});