/**
 * Created by boebel on 14.09.2017.
 */
/**
 * Created by Boebel on 04.09.2017.
 */

const Rx = require('rxjs/Rx');
const Vertica = require('vertica');

const log4js = require('log4js');


/**
 * Sets Environment variables and connects to config script
 * @type {*}
 */
const env = process.env.NODE_ENV || 'development';
const config = require('../config')[env];


log4js.configure(config.log);
const logger = log4js.getLogger('datalog', 'console');

var connection;
var exports = module.exports = {};

var values = [];

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
        if (err) logger.error(err)
    });
}

exports.doQuery = function (query) {
    return new Promise((resolve, reject) => {
        connection.query(query, (err, result) => {
            if (err) reject(err)
            else resolve(result);
        });
    });
}

exports.initTable = async function () {
    let query = `DROP TABLE IF EXISTS ${config.database.requestTable}; CREATE TABLE IF NOT EXISTS ${config.database.requestTable} 
      (timestamp Timestamp,
       elapsedTime numeric(7,2),
       succeed boolean,
       PRIMARY KEY(timestamp));
      `;

    try {
        await exports.doQuery(query)
        logger.info("CREATE NEW TABLE");
    } catch (err) {
        console.error(err);
    }
}

exports.writeRequest = function (data) {
    values.push(data);
};

exports.commitValues = async function () {

    let avg = values.reduce((sum, element, a, array) => sum + element.elapsedTime / array.length, 0);
    let successful = values.reduce((sum, element) => sum && element.successful, true);

    if (values[0]) {
        let query = `INSERT into ${config.database.requestTable}
    VALUES ('${values[0].start}',${avg},${successful});commit;`;

        try {
            await exports.doQuery(query)
        } catch (err) {
            logger.error(err);
        }

    }

    values = [];
}

connection = connectDatabase();

exports.initTable();




