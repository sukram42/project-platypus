/**
 * Created by boebel on 14.09.2017.
 */
/**
 * Created by Boebel on 04.09.2017.
 */

const Rx = require('rxjs/Rx');
const Vertica = require('vertica');

var SqlString = require('sqlstring');
var env = process.env.NODE_ENV || 'development';
const config = require('../../config')[env];
var exports = module.exports = {};

exports.getAll = function () {
  let query = "SELECT * FROM " + config.database.maintable;
  return get(query);
}

exports.getCompanyInformation = function (symbol) {
  if (symbol) {
    let query = "SELECT * FROM " + config.database.maintable + " WHERE symbol = " + SqlString.escape(symbol);
    return get(query, true);
  } else return null;
}

exports.getCompanyInformationFromDate = function (symbol, date) {

  //return find({symbol, "values.date": date});
}
exports.getCompanyDataFromDate = function (symbol, fromDate, toDate) {
  // return find({symbol, "values":{$elemMatch:{"timestamp":{$gte:fromDate, $lte:toDate}}}});
}

exports.getCompanyNames = function (){
  query = "SELECT symbol from " + config.database.maintable + " GROUP BY symbol";
  return get(query).then((data)=>{
    let erg = [];
    data.rows.map(item =>erg.push(item[0]));
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
    connection.query(query, (err, result) => err ? reject(err) : resolve(result));
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
