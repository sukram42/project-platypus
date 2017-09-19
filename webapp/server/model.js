/**
 * Created by boebel on 14.09.2017.
 */
/**
 * Created by Boebel on 04.09.2017.
 */

const Rx = require('rxjs/Rx');
const Vertica = require('vertica');
var SqlString = require('sqlstring');

/**
 * Sets Environment variables and connects to config script
 * @type {*}
 */
var env = process.env.NODE_ENV || 'development';
const config = require('../config')[env];

var exports = module.exports = {};

exports.getAll = function () {
  let query = "SELECT * FROM " + config.database.maintable;
  return get(query);
}

/**
 *Gives Back company information concerning a given interval.
 *
 * @param symbol Company symbol
 * @param amount Amount of hours/minutes
 * @param unit  the unit like hours/minutes
 * @returns {*}
 */
exports.getCompanyInformation = function (symbol, amount, unit) {
  if (!amount || !unit) {
    return new Promise((res, rej) => rej("WRONG PARAMETERS GIVEN"));
  }
  ;
  if (symbol) {
    let slicing = SqlString.escape(amount + " " + unit);
    let companyQuery = "(SELECT * FROM " + config.database.maintable + " WHERE symbol LIKE " + SqlString.escape(symbol) + ") as companyQuery ";
    let overQuery = " OVER(PARTITION by companyQuery.symbol ORDER BY timestamp);";
    let timeseriesQuery = "TIMESERIES slice_time AS " + slicing + " ";
    let query = " SELECT slice_time as timestamp, TS_LAST_VALUE(price) as price ,TS_LAST_VALUE(volume) as volume , TS_LAST_VALUE(change) as change,TS_LAST_VALUE(delayedPrice) as delayedPrice ,TS_LAST_VALUE(delayedPriceTime) AS delayedPriceTime FROM " + companyQuery + timeseriesQuery + overQuery;


    return get(query, true);
  } else return null;
}

/**
 * Gives Back company information concerning an amount of values
 * @param symbol company
 * @param count amount of values
 * @returns {Promise.<*>}
 */
exports.getCompanyInformation = async function (symbol,count) {

  if(symbol && count < 500) {
    let countQuery = 'SELECT (MAX(timestamp)-MIN(timestamp))/' +  (count-1) + ' AS dif FROM sharevalues;';

    let interval = await get(countQuery, false);
    interval = interval.rows[0][0];
    console.log(interval);

    if (symbol) {
      let companyQuery = "(SELECT * FROM " + config.database.maintable + " WHERE symbol LIKE " + SqlString.escape(symbol) + ") as companyQuery ";
      let overQuery = " OVER(PARTITION by companyQuery.symbol ORDER BY timestamp);";
      let timeseriesQuery = "TIMESERIES slice_time AS '" + interval.hours+ ":" + interval.minutes + ":" + interval.seconds + "'";
      let query = " SELECT slice_time as timestamp, TS_LAST_VALUE(price) as price ,TS_LAST_VALUE(volume) as volume , TS_LAST_VALUE(change) as change,TS_LAST_VALUE(delayedPrice) as delayedPrice ,TS_LAST_VALUE(delayedPriceTime) AS delayedPriceTime FROM " + companyQuery + timeseriesQuery + overQuery;

      let result = await get(query, true);
      return result;
    } else return null;
  }else return {err: "Count too high "}
}


exports.getCompanyInformationFromDate = function (symbol, date) {

  //return find({symbol, "values.date": date});
}
exports.getCompanyDataFromDate = function (symbol, fromDate, toDate) {
  // return find({symbol, "values":{$elemMatch:{"timestamp":{$gte:fromDate, $lte:toDate}}}});
}

/**
 * returns the names of companies in the database
 * @returns {Promise.<TResult>}
 */
exports.getCompanyNames = function () {
  query = "SELECT symbol from " + config.database.maintable + " GROUP BY symbol";
  return get(query).then((data) => {
    let erg = [];
    data.rows.map(item => erg.push(item[0]));
    return erg;
  });
}

/**
 * Get Data from Database
 * @param query   SQL Query
 * @param asJSON  Boolean, if it should be wrapped as an JSON
 * @returns {Promise.<TResult>}
 */
function get(query, asJSON) {
  return new Promise((resolve, reject) => {
    let connection = connectDatabase();
    connection.query(query, (err, result) => {
      console.log("Result",result);
      err ? reject(err) : resolve(result, connection);
      try {
        connection.disconnect();
      } catch (err) {
        console.log(err)
      }
    });

  }).then(
    (result) => {
      return asJSON ? (jsonfy(result)) : result;
    });
}

/**
 *
 Connect to Vertica
 */
function connectDatabase() {
  return connection = Vertica.connect({
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    database: config.database.database
  }, (err) => {
    if (err) console.error(err)
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
