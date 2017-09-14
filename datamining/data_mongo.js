/**
 * URL of the MongoDB
 */
var MONGO_URL = 'mongodb://192.168.99.100:27017/datamining';
var COLLECTION_NAME = 'companies';
var INTERVAL = 5000;
var INITIALIZE_DB = true;

/**
 * Abbreviation of companies
 * AAPL  | Apple
 * AMZN  | Amazon
 * HPE   | Hewlett Packard Enterprise
 * IBM   | IBM
 * DXC   | DXC Technology
 * DVMT  | DELL
 * CSCO  | Cisco
 * INTC  | Intel
 * SMCI  | Super Micro
 * GOOGL | Google
 *
 * @type {[*]}
 */

var requestify = require('requestify');
var mongo = require('mongodb').MongoClient;
var assert = require('assert');
var moment = require('moment');

/**Standard URL to get the information
 *
 %#company#% -> Placeholder for the company symbol*/
var standardURL = "https://api.iextrading.com/1.0/stock/%#company#%/quote";//?filter=symbol,latestTime,latestPrice,latestVolume,change,delayedPrice,delayedPriceTime";

var iteration = 0;

/**
 * Start Initialization if its wanted
 */
INITIALIZE_DB ? initDB() : console.log("No Initalization");
setInterval(getData, INTERVAL);


/**
 * ##########################################################################
 * INITIALIZATION
 * ##########################################################################
 */
function initDB() {
    console.log("Starting Initialization")
    mongo.connect(MONGO_URL, function (err, db) {
        deleteDB(db, (err, result) => {
            if (err)
                console.log("ERROR", error);
            else {
                console.log("dropped Table");
                createFields(db);
            }
        });

    });
}
/**
 * Creates the Fields for the Companies
 * @param db
 */
function createFields(db) {
    symbols.forEach(symbol => {
        let obj = {symbol, value: []};
        getInformation(symbol)
            .then(info => {
                db.collection(COLLECTION_NAME).insertOne(Object.assign(JSON.parse(info.body), obj));
            });
    });

    db.collection(COLLECTION_NAME).createIndex({symbol:1,"values.timestamp":1,"values.date":1}, (err, result)=>console.log(result));


    console.log("Initialization finished");
    console.log("_________________________________________________________")
}


function getInformation(symbol) {
    return requestify.get('https://api.iextrading.com/1.0/stock/' + symbol + '/company')
}

function deleteDB(db, callback) {
    db.collection(COLLECTION_NAME).deleteMany({}, (err, result) => callback(err, result));
}


/**
 * ##########################################################################
 * FETCHING DATA
 * ##########################################################################
 */


/**
 * Fetches Data from the API
 */
function getData() {
    iteration++;
    console.log("Iteration " + iteration + " starting");
    fetchData(getURLs());
}

/**
 * Generates the API URLs
 */
function getURLs() {
    let urls = [];

    symbols.forEach(company => {
        let url = standardURL.replace("%#company#%", company);
        urls.push(url);
    });

    return urls;
}

/**
 * Fetches the information from the API
 * @param urls
 */
function fetchData(urls) {

    urls.forEach(url => {
        requestify.get(url).then(response => {
            if (response.getBody().latestPrice) {
                saveInDb(response.getBody());
            }
            else console.log("Exchange Closed");
        });
    });
}

/**
 * Pushes Information into the Database
 * @param body
 */
function saveInDb(body) {
    let date = moment().format('YYYY-MM-DD');

    var values = {
        "price": body.latestPrice,
        "volume": body.latestVolume,
        "change": body.change,
        "time": body.latestTime,
        "timestamp": moment().toDate(),
        "delayedPrice": body.delayedPrice,
        "delayedPriceTime": body.delayedPriceTime,
        date
    }

    mongo.connect(MONGO_URL, function (err, db) {
        db.collection(COLLECTION_NAME).updateOne({symbol: body.symbol}, {$push: {"values": values}})
        db.close();
    });
}
