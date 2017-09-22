/**
 * Created by Boebel on 04.09.2017.
 */

const express = require('express');
const router = express.Router();

const log4js = require('log4js');

/**
 * Sets Environment variables and connects to config script
 * @type {*}
 */
var env = process.env.NODE_ENV || 'development';
const config = require('../config')[env];

log4js.configure(config.log);
const logger = log4js.getLogger('datalog','console');


const model = require('./model');
const database = require('./database');

/**
 *  GET | GET DatabaseLog
 */
router.get('/database/log', (req, res) => {
  database.getLog().then(
    (data) => res.status(200).send(data)
    , (err) => res.status(500).send(err));
});

/**
 *  GET | GET DatabaseLog
 */
router.get('/database/buildinfo', (req, res) => {
  database.getBuildInfo().then(
    (data) => res.status(200).send(data)
    , (err) => res.status(500).send(err));
});

/**
 *  GET | GET DatabaseLog
 */
router.get('/database/stats', (req, res) => {
  logger.info("Request on route /database/stats");
  database.getStats().then(
    (data) => res.status(200).send(data)
    , (err) => res.status(500).send(err));
});


/**
 *  GET | TESTS API
 */
router.get('/', (req, res) => {
  logger.info("Request on route /");
  res.status(200).send('api works');
});

/**
 *  GET | COMPANIES
 */
router.get('/companies', (req, res) => {
  logger.info("Request on route /companies");
  model.getAll().then(promiseData => {
    promiseData.subscribe(data => {
      res.status(200).send(data);
    }, err => res.status(500).send(err));
  });
});

/**
 *  GET | HIGH AND MIN
 */
router.get('/companies/max', (req, res) => {
  logger.info("Request on route /companies/max");
  model.getMaxAndMin().then((data) => res.send(data), (err) => res.send(err));
});


/**
 *  GET | COMPANY NAMES
 */
router.get('/companies/names', (req, res) => {
  logger.info("Request on route /companies/names");
  model.getCompanyNames().then((data) => res.send(data), (err) => res.send(err));
});

/**
 *  GET | COMPANY DATA
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
    res.send(err);
  }

});


module.exports = router;