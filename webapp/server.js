// Get dependencies
const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const log4js = require('log4js');

var env = process.env.NODE_ENV || 'development';
const config = require('./config')[env];

log4js.configure(config.log);
const logger = log4js.getLogger('datalog','console');


const api = require('./server/api');

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

const port = process.env.PORT || config.server.port|| '3000';
app.set('port', port);

// Set API routes
app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const server = http.createServer(app);
server.listen(port, () => logger.info(`API running on localhost:${port}`));