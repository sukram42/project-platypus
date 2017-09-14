/**
 * Created by boebel on 14.09.2017.
 */
/**
 * Created by Boebel on 04.09.2017.
 */

const Rx = require('rxjs/Rx');
const Vertica = require('vertica');
var env = process.env.NODE_ENV || 'development';
var SqlString = require('sqlstring');
const config = require('../../config')[env];
var exports = module.exports = {};


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
 *
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


exports.getAll = function () {
  let query = "SELECT * FROM " + config.database.maintable;
  return get(query);
}

exports.getCompanyInformation = function (symbol) {
  if (symbol) {
    let query = "SELECT * FROM " + config.database.maintable + " WHERE symbol = " + SqlString.escape(symbol);
    return get(query);
  } else return null;
}

exports.getCompanyInformationFromDate = function (symbol, date) {

  //return find({symbol, "values.date": date});
}

exports.getCompanyDataFromDate = function (symbol, fromDate, toDate) {
  // return find({symbol, "values":{$elemMatch:{"timestamp":{$gte:fromDate, $lte:toDate}}}});
}

function get(query) {
  return new Promise((resolve, reject) => {
    connectDatabase().query(query, (err, result) => err ? reject(err) : resolve(result));
  }).then(
    (result) => {
      return (jsonfy(result));
    });
}



