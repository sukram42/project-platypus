/**
 * Created by boebel on 14.09.2017.
 */
'use strict';

const Rx = require('rxjs/Rx');
const Vertica = require('vertica');
const SqlString = require('sqlstring');
const log4js = require('log4js');

const companyNamesCache = require('./company_name_cache');

// TODO QUERY VARIABLE
let querys = 0;

/**
 * Sets Environment variables and connects to config script
 * @type {*}
 */
const env = process.env.NODE_ENV || 'development';
const config = require('../config')[env];


log4js.configure(config.log);
const logger = log4js.getLogger('datalog', 'console');


var exports = module.exports = {};

exports.getAll = async function () {
  let query = "SELECT * FROM " + config.database.maintable;
  try {
    return await get(query);
  } catch (err) {
    logger.error("GET ALL", err);
    return null;
  }
};

/**
 *Gives Back company information concerning a given interval.
 *
 * @param symbol Company symbol
 * @param amount Amount of hours/minutes
 * @param unit  the unit like hours/minutes
 * @returns {*}
 */
exports.getCompanyInformation = async function (symbol, amount, unit) {
  if (!amount || !unit) {
    return new Promise((res, rej) => rej("WRONG PARAMETERS GIVEN"));
  }

  if (symbol) {
    let slicing = SqlString.escape(amount + " " + unit);
    let companyQuery = "(SELECT * FROM " + config.database.maintable + " WHERE symbol LIKE " + SqlString.escape(symbol) + ") as companyQuery ";
    let overQuery = " OVER(PARTITION by companyQuery.symbol ORDER BY timestamp);";
    let timeseriesQuery = "TIMESERIES slice_time AS " + slicing + " ";
    let query = " SELECT slice_time as timestamp, TS_LAST_VALUE(price) as price ,TS_LAST_VALUE(volume) as volume , TS_LAST_VALUE(change) as change,TS_LAST_VALUE(delayedPrice) as delayedPrice ,TS_LAST_VALUE(delayedPriceTime) AS delayedPriceTime FROM " + companyQuery + timeseriesQuery + overQuery;
    try {
      return await get(query, true);
    } catch (err) {
      logger.error("getCompanyInformation", err);
      return null;
    }
  } else return null;
};

/**
 * Gives Back company information concerning an amount of values
 * @param symbol company
 * @param count amount of values
 * @returns {Promise.<*>}
 */
exports.getCompanyInformation = async function (symbol, count) {

  if (symbol && count < 500) {
    let countQuery = 'SELECT (MAX(timestamp)-MIN(timestamp))/' + (count - 1) + ' AS dif FROM sharevalues;';

    let interval = await get(countQuery, false);
    interval = interval.rows[0][0];

    if (symbol) {
      let companyQuery = "(SELECT * FROM " + config.database.maintable + " WHERE symbol LIKE " + SqlString.escape(symbol) + ") as companyQuery ";
      let overQuery = " OVER(PARTITION by companyQuery.symbol ORDER BY timestamp);";
      let timeseriesQuery = "TIMESERIES slice_time AS '" + interval.hours + ":" + interval.minutes + ":" + interval.seconds + "'";
      let query = " SELECT slice_time as timestamp, TS_LAST_VALUE(price) as price ,TS_LAST_VALUE(volume) as volume , TS_LAST_VALUE(change) as change,TS_LAST_VALUE(delayedPrice) as delayedPrice ,TS_LAST_VALUE(delayedPriceTime) AS delayedPriceTime FROM " + companyQuery + timeseriesQuery + overQuery;

      try {
        return await get(query, true);

      } catch (err) {

        logger.error(err);
        return null;
      }
    } else return null;
  } else return {err: "Count too high "}
};

exports.getMaxAndMin = async function () {
  let query = "SELECT symbol, MAX(price), MIN(price) from " + config.database.maintable + " GROUP BY symbol";

  try {

    let queryResult = await get(query, true);
    let result = {};
    queryResult.map(item => (result[item.symbol] = {"min": item.MAX, "max": item.MIN}));
    return result;
  } catch (err) {
    return null;
  }
};

/**
 * eturns the names of companies in the database
 * @returns {Promise.<erg>}
 */
exports.getCompanyNames = async function () {
  let names = companyNamesCache.getCachedNames();
  if (names) {
    return new Promise((res) => {
      logger.debug("Send by Cache");
      res(names);
    });
  }

  let query = "SELECT symbol from " + config.database.maintable + " GROUP BY symbol";
  return get(query).then((data) => {
    let erg = [];
    data.rows.map(item => erg.push(item[0]));
    companyNamesCache.setCachedNames(erg);
    return erg;
  }).catch((err) => logger.error(err));
};

/**
 * Get Data from Database
 * @param query   SQL Query
 * @param asJSON  Boolean, if it should be wrapped as an JSON
 * @returns {Promise.<TResult>}
 */
function get(query, asJSON) {

  logger.debug("Query NO", ++querys);

  try {
    return new Promise((resolve, reject) => {

      let connection = connectDatabase();
      connection.query(query, (err, result) => {
        try {
          connection.disconnect();
        } catch (err) {
          logger.error("NOT DISCONNECTED:", err)
        }
        err ? reject(err) : resolve(result, connection);
      });
    })
      .then(
        (result) => {
          return asJSON ? (jsonfy(result)) : result;
        })
      .catch(err => {
        logger.error("Error", err);
      });
  } catch (err) {
    logger.error("TRY GET:", err);
  }
}

/**
 *
 Connect to Vertica
 */
function connectDatabase() {
  return Vertica.connect({
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    database: config.database.database
  }, (err) => {
    if (err) throw err;
  });
}

/**
 * Converts the Database Data into JSON
 * @param result
 * @returns {Array}
 */
function jsonfy(result) {

  let ergArray = [];

  let fields = result.fields;
  let rows = result.rows;

  rows.map((row) => {
    let erg = {};

    row.map((element, index) => erg[fields[index].name] = element);

    ergArray.push(erg);
  });
  return ergArray;
}
