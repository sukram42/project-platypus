// Get dependencies
const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

var env = process.env.NODE_ENV || 'development';
const config = require('../config')[env];

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
server.listen(port, () => console.log(`API running on localhost:${port}`));