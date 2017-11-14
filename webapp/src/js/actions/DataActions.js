/**
 * Created by boebel on 04.09.2017.
 * @module Webapp/Frontend/Actions
 */

import dispatcher from '../dispatchers/dispatcher';
import axios from 'axios';

const env = process.env.NODE_ENV || 'development';
const config = require('../../../config')[env];

var companyNames = {};

export const POLLING_TIME = config.polling;


/**
 * Fetching Company Names from Backend
 */
export function fetchCompanyNames() {
  let url = (env == 'development' ? "https://" + config.server.host + ":" + config.server.port + "/" : "") + "api/companies/names";

  axios.get(url)
    .then(response => {
      companyNames = response.data;
      dispatcher.dispatch({
        "type": 'FETCH_COMPANY_NAMES',
        "data": response.data
      })
    }).catch(function (error) {
    console.log(error);
  });
}

/**
 * Fetches Companydata from the Backend
 * @param{string} symbol Symbol of the Company
 */
export function fetchCompanyData(symbol) {

  const count = 30;

  let url = (env === 'development' ? "https://" + config.server.host + ":" + config.server.port + "/" : "") + "api/companies/" + symbol + "?count=" + count;
  axios.get(url).then(response => {

    dispatcher.dispatch({
      "type": 'FETCH_COMPANY_DATA:' + symbol.toUpperCase(),
      "data": response.data
    })

  });

}

/**
 * starts polling of the companies' data
 * @param {string} symbol  CompanySymbol
 * @returns Interval
 */
export function startCompanyPolling() {
  companyNames.map(symbol => fetchCompanyData(symbol));
  let interval = setInterval(() => {
    if (companyNames) {
      companyNames.map(symbol => fetchCompanyData(symbol));
    } else {
      console.error("No company names found. Please fetch them first");
    }
  }, POLLING_TIME);
  return interval;
}

/**
 * Stops polling of companydata
 * @param interval Interval-instance, which should be stopped
 */
export function stopCompanyPolling(interval) {
  if (interval) {
    clearInterval(interval);
  } else throw "Error! No valid Interval given! ";
}

/**
 * Fetches Company Information, such as CEO, Market, etc from the Backend
 * @param{string} symbol Symbol of the company
 */
export function fetchCompanyInformation() {
  if (companyNames) {
    companyNames.map(symbol => {
      if (symbol) {
        axios.get('https://api.iextrading.com/1.0/stock/' + symbol + '/company')
          .then(response => {
            dispatcher.dispatch({
              "type": 'FETCH_COMPANY_INFO:' + symbol.toUpperCase(),
              "data": response.data
            })
          });
      } else console.log("No Symbol given");
    });
  } else console.error("No company names found. Please fetch them first");
}

/**
 * GET Highest and lowest prices of the shares
 * @param symbol Symbol of the Company
 */
export function fetchMaxAndMin() {
  axios.get((env == 'development' ? "https://" + config.server.host + ":" + config.server.port + "/" : "") + 'api/companies/max')
    .then(response => {
      let data = response.data;
      Object.keys(response.data).map((item) => {
        sendValue("LOWEST", item, data[item].min);
        sendValue("HIGHEST", item, data[item].max);
      });
    }, (err) => {
      console.log("Ups", err);
    });
}
/**
 * Sends a value to the Store
 * @param{string} listener identification string of the value
 * @param symbol Symbol of the company
 * @param value value, which should be transmitted
 */
export function sendValue(listener, symbol, value) {
  if (value) {
    dispatcher.dispatch(
      {
        'type': 'SEND_VALUE',
        symbol,
        listener,
        'data': value
      });
  }
}

/**
 * Tests if the loadTest is already running
 */
export async function testIsStarted() {
  try {
    let path = (env == 'development' ? "https://" + config.server.host + ":" + config.server.port: "") + "/api/test";
    console.log(path);
    let response = await axios.get(path, {
      validateStatus: function (status) {
        return status < 500; // Reject only if the status code is greater than or equal to 500
      }
    });
    return response;
  } catch (err) {
    return err;
  }
}

/**
 * Sends Request to the JMeter Backend to start the Load-test
 * @async
 * @returns {boolean}
 */
export async function startTests() {
  try {
    if (await testIsStarted()) {
      let path = (env == 'development' ? "https://" + config.server.host + ":" + config.server.port  : "") + "/" +"api/test";
      console.log(path);
      let response = await axios.post(path,{validateStatus: function (status) {
        return status < 500; // Reject only if the status code is greater than or equal to 500
      }});
      dispatcher.dispatch(
        {
          'type': 'TEST_STARTED',
          'data': response.data
        });
      return response;
    }
  } catch (err) {
    console.log(err)
  }
}