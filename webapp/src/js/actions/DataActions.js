/**
 * Created by boebel on 04.09.2017.
 */

import dispatcher from '../dispatchers/dispatcher';
import axios from 'axios';

var env = process.env.NODE_ENV || 'development';
const config = require('../../../../config')[env];


export const POLLING_TIME = config.polling;

/**
 * FETCHING OF COMPANY NAMES IN THE DATABASE
 */
export function fetchCompanyNames() {
  let url = "http://" + config.server.host + ":" + config.server.port + "/api/companies/names";
  axios.get(url)
    .then(response => {
      dispatcher.dispatch({
        "type": 'FETCH_COMPANY_NAMES',
        "data": response.data
      })
    }).catch(function (error) {
    console.log(error);
  });
}

/**
 * Fetches Companydata from backendserver
 * @param symbol
 */
export function fetchCompanyData(symbol) {
  const count = 30;

  let url = "http://" + config.server.host + ":" + config.server.port + "/api/companies/" + symbol + "?count=" + count;
  axios.get(url)
    .then(response => {
      dispatcher.dispatch({
        "type": 'FETCH_COMPANY_DATA:' + symbol.toUpperCase(),
        "data": response.data
      })
    });
}
/**
 * Starts polling of companydata
 * @param symbol  CompanySymbol
 * @returns Interval-entity
 */
export function startCompanyPolling(symbol) {
  fetchCompanyData(symbol);
  let interval = setInterval(() => fetchCompanyData(symbol), POLLING_TIME);
  return interval;
}
/**
 * Starts polling of companydata
 * @param symbol
 * @returns {number}
 */
export function stopCompanyPolling(interval) {
  if (interval) {
    clearInterval(interval);
  } else throw "Error! No valid Interval given! ";
}


export function fetchData() {
  //TODO Port ändern
  axios.get('http://localhost:3001/api/companies')
    .then(response => {
      dispatcher.dispatch({
        "type": 'FETCH_COMPANY_DATA',
        "data": response.data
      })
    });
}


/**
 * Fetches Company Information
 * @param symbol
 */
export function fetchCompanyInformation(symbol) {
  if (symbol) {
    axios.get('https://api.iextrading.com/1.0/stock/' + symbol + '/company')
      .then(response => {
        dispatcher.dispatch({
          "type": 'FETCH_COMPANY_INFO:' + symbol.toUpperCase(),
          "data": response.data
        })
      });
  } else console.log("No Symbol given");
}

/**
 * GET Highest and lowest prices
 * @param symbol
 */
export function fetchMaxAndMin() {
  axios.get('http://localhost:3001/api/companies/max')
    .then(response => {
      dispatcher.dispatch({
        "type": 'FETCH_COMPANY_MAX',
        "data": response.data
      })
    }, (err) => {
      console.log("Ups", err);
    });
}


export function startPollingLog() {
  if (!this.logInterval) {
    this.logInterval = setInterval(() => {
      fetchDatabaseLog();
    }, POLLING_TIME);
  }
}
export function stopPollingLog() {
  if (this.logInterval) {
    clearInterval(this.interval);
  }
}
export function startPolling() {
  if (!this.interval) {
    this.interval = setInterval(() => {
      fetchData();
    }, POLLING_TIME);
  }
}
export function stopPolling() {
  if (this.interval) {
    clearInterval(this.interval);
  }
}


export function startPollingCompany(symbol) {
  if (!this.interval) {
    this.companyInterval[symbol] = setInterval(() => {
      fetchCompanyData();
    }, POLLING_TIME);
  }
}
export function stopPollingCompany(symbol) {
  if (this.companyInterval[symbol]) {
    clearInterval(this.interval);
  }
}
