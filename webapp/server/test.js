/**
 * Created by boebel on 09.11.2017.
 */


const log4js = require('log4js');
const requestify = require('requestify');


//Sets Environment variables and connects to config script

var env = process.env.NODE_ENV || 'development';
const config = require('../config')[env];

log4js.configure(config.log);
const logger = log4js.getLogger('datalog', 'console');


var exports = module.exports = {};

/**
 * API Endpoint, which connects to the JMeter Master and starts a test
 * @param req
 * @param res
 * @returns {Promise.<void>}
 */
exports.startTest = async function (req, res) {
  logger.log("Test started");
  // requestify.post(‘http://example.com’, { hello: ‘world’ })
  //            .then(function(response) { // Get the response body (JSON parsed or jQuery object for XMLs) response.getBody();
  let url = `http://${config.jmmaster.host}:${config.jmmaster.port}/startServer`;

  try {
    let response = await requestify.post(url,
      {
        filename: config.jmmaster.filename,
        clients: ['jmserver']
      }
    );

    if (response) {
      res.status(200).send(response);
    } else
      res.status(response.status).send(response);
  } catch (err) {
    logger.error(err);
    res.status(500).send(err);
  }
};

/**
 * API Endpoint, which connects to test if a load test is already started
 * @param req
 * @param res
 * @returns {Promise.<void>}
 */
exports.isTestStarted = async function (req, res) {
  let url = `http://${config.jmmaster.host}:${config.jmmaster.port}/startServer`;

  try {
    let response = await requestify.get(url);

    if (response) {
      res.status(response.status).send(response.body);
    } else
      res.status(response.status).send(response.body);
  } catch (err) {
    res.status(500).send(err);
  }
}