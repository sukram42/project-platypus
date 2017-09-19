/**
 * Created by Boebel on 04.09.2017.
 */

const express = require('express');
const router = express.Router();

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
  console.log("Request on route /database/stats");
  database.getStats().then(
    (data) => res.status(200).send(data)
    , (err) => res.status(500).send(err));
});


/**
 *  GET | TESTS API
 */
router.get('/', (req, res) => {
  console.log("Request on route /");
  res.status(200).send('api works');
});

/**
 *  GET | COMPANIES
 */
router.get('/companies', (req, res) => {
  console.log("Request on route /companies");
  model.getAll().then(promiseData => {
    promiseData.subscribe(data => {
      res.status(200).send(data);
    }, err => res.status(500).send(err));
  });
});

/**
 *  GET | COMPANY NAMES
 */
router.get('/companies/names', (req, res) => {
  console.log("Request on route /companies/names");
  model.getCompanyNames().then((data) => res.send(data), (err) => res.send(err));
});

/**
 *  GET | COMPANY DATA
 */
router.get('/companies/:companyId', async (req, res) => {
  console.log("Request on route /:companyId");
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