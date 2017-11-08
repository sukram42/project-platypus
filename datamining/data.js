/**
 * @module Datamining/Data
 * @desc Controller Module for the Datamining of the Sharevalues
 * Created by boebel on 13.09.2017.
 */

const moment = require('moment');
const requestify = require('requestify');
const Vertica = require('vertica');

const env = process.env.NODE_ENV || 'development';
const config = require('./config')[env];

const log4js = require('log4js');

var standardURL = "https://api.iextrading.com/1.0/stock/%#company#%/quote";//?filter=symbol,latestTime,latestPrice,latestVolume,change,delayedPrice,delayedPriceTime";

var exports = module.exports = {};

log4js.configure(config.log);
const logger = log4js.getLogger('datalog', 'console');


var connection;
var iteration = 0;

var database = config.database.db;
var host = config.database.host;
var user = config.database.user;
var password = config.database.password;

logger.info("Connect to " + host);
logger.info("Database " + database);
logger.info("NODE_ENV: " + env);


/**
 * Method to connect to the Database
 * @returns {*}
 */
exports.connectDatabase = function () {
    logger.info("Connect to Database");
    return connection = Vertica.connect({
        host,
        user,
        password,
        database
    }, (err) => {
        if (err) {
            logger.fatal("DATABASE ERROR:", err);
            logger.fatal("EXECUTION STOPPED");
            process.exit();
        }
    });
}

/*
 * ##########################################################################
 * INITIALIZATION
 * ##########################################################################
 */

/**
 * Method to Initialize the Database.
 * That means to Drop the Maintable and create a new one.
 * @returns {Promise.<void>}
 */
exports.initDB = async function () {
    await exports.dropTable();
    logger.info("Initialized");
    return exports.createDatabase();
}

/**
 * Method to drop the Maintable
 */
exports.dropTable = function () {
    logger.info("DROP TABLE");
    let query = "DROP TABLE IF EXISTS " + config.database.maintable;

    return exports.doQuery(query);
}

/**
 * Method to Create a new Table
 */
exports.createDatabase = function () {
    let query = "CREATE TABLE IF NOT EXISTS " + config.database.maintable +
        "(timestamp TIMESTAMP" +
        ", price numeric(5,2)" +
        ",change float" +
        ",volume integer" +
        ",delayedPrice numeric(5,2)" +
        ",delayedPriceTime timestamp" +
        ",symbol varchar(6)" +
        ",PRIMARY KEY(symbol,timestamp));";
    logger.info("CREATE NEW TABLE");
    return exports.doQuery(query, true);
}

/**
 * Helper Function to query.
 * @param query
 * @returns {Promise}
 */
exports.doQuery = function (query) {
    return new Promise((resolve, reject) => {
        connection.query(query, (err, result) => {
            if (err) reject(err)
            else resolve(result);
        });
    });
}

/*
 * ##########################################################################
 * FETCHING DATA
 * ##########################################################################
 */

/**
 * Function which fetches Data from the API
 */
exports.getData = function () {

    iteration++;
    logger.info("Iteration " + iteration + " starting");
    exports.fetchData(exports.getURLs());
}

/**
 * Method which generates the API URLs
 */
exports.getURLs = function () {
    let urls = [];

    config.datamining.symbols.forEach(company => {
        let url = standardURL.replace("%#company#%", company);
        urls.push(url);
    });

    return urls;
}
/**
 * This Functions fetches the information from the API
 * @param urls Urls which should be fetched
 */
exports.fetchData = function (urls) {

    urls.forEach(url => {
        requestify.get(url).then(response => {
            if (response.getBody().latestPrice) {
                exports.saveInDb(response.getBody());
            }
            else logger.info("Exchange Closed");
        });
    });
}

/**
 * Function which saves the requested Data into the database
 * @param body Body from the Requests
 * @returns {Promise.<TResult>}
 */
exports.saveInDb = function (body) {
    var values = {
        "symbol": body.symbol,
        "price": body.latestPrice,
        "volume": body.latestVolume,
        "change": body.changePercent,
        "time": body.latestTime,
        "timestamp": moment().format("YYYY-MM-DD h:mm:ss"),
        "delayedPrice": body.delayedPrice,
        "delayedPriceTime": moment(body.delayedPriceTime).format("YYYY-MM-DD h:mm:ss"),
    }
    querys = "INSERT INTO " + config.database.maintable + "(timestamp,price,change,volume,delayedPrice,delayedPriceTime,symbol)  VALUES " + "('"
        + values.timestamp + "',"
        + values.price + ","
        + values.change + ","
        + values.volume + ","
        + values.delayedPrice + ",'"
        + values.delayedPriceTime + "','"
        + values.symbol + "');commit;";

    return exports.doQuery(querys, true).then(() => {
    }, err => logger.error(err));
}

/*
 * Start initialization if wanted.
 * Set Interval for datapolling
 */
connection = exports.connectDatabase();

config.datamining.initialisation ? exports.initDB() : logger.info("No Initialisation");
setInterval(exports.getData, config.datamining.interval);
