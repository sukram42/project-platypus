/**
 * Created by Boebel on 04.09.2017.
 */

const express = require('express');
const router = express.Router();
const model = require('./model');


/**
 *  GET | TESTS API
 */
router.get('/', (req, res) => {
  console.log("Request on route /")
  res.send('api works');
});

router.get('/:companyId', (req, res) => {

  console.log("Request on route /:companyId")
  model.getCompanyInformation("HPE").then(promiseData => {
    promiseData.subscribe(data =>{ console.log(data);res.send(data);}, err => res.send(err));
  })
});

router.get('/:companyId/:date', (req, res) => {
  console.log("Request on route /:companyId/:date")
  model.getCompanyInformationFromDate(req.params.companyId, req.params.date).then(promiseData => {
    promiseData.subscribe(data => {
        res.send(data);
      }, err => res.send(err))
  });
});


module.exports = router;