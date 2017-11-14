/**
 * @module Webapp/Backend/API Endpoints
 * @desc Module to set the API endpoints of the server#
 * @author Markus Böbel
 *
 */


const express = require('express');
const router = express.Router();
const test = require('./test');
const log4js = require('log4js');


//Sets Environment variables and connects to config script

var env = process.env.NODE_ENV || 'development';
const config = require('../config')[env];

log4js.configure(config.log);
const logger = log4js.getLogger('datalog','console');


const model = require('./model');


/**
 *  GET | HIGH AND MIN
 */
router.get('/companies/max', (req, res) => {
  logger.info("Request on route /companies/max");
  model.getMaxAndMin().then((data) => res.send(data), (err) => res.send(err));
});


/**
 *  HTTP requests to retrieve the Names and symbols of the companies in the _database_.
 */
router.get('/companies/names', (req, res) => {
  logger.info("Request on route /companies/names");
  model.getCompanyNames().then((data) => res.send(data), (err) => res.send(err));
});

/**
 *  HTTP request on '/companies'
 */
router.get('/companies/:companyId', async (req, res) => {
  logger.info("Request on route /:companyId");
  let company = req.params.companyId.toUpperCase();

  let count = req.query.count;
  let amount = req.query.amount;
  let unit = req.query.unit;

  try {
    if (unit && !unit.contains("seconds")  && amount)
      res.status(200).send(await model.getCompanyInformation(company, amount, unit));
    else if (count)
      res.status(200).send(await model.getCompanyInformation(company, count));
    else res.status(500).send("WRONG PARAMETERS");
  } catch (err) {
    logger.log("hallo");
    res.send(err);
  }

});

router.route('/test').post(test.startTest)
      .get(test.isTestStarted);


module.exports = router;



