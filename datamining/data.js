/**
 * Created by boebel on 13.09.2017.
 */
const moment = require('moment');
const requestify = require('requestify');
const Vertica = require('vertica');
const config = require('../config')['production'];
var standardURL = "https://api.iextrading.com/1.0/stock/%#company#%/quote";//?filter=symbol,latestTime,latestPrice,latestVolume,change,delayedPrice,delayedPriceTime";

var connection;
var iteration = 0;

/**
 * Start initialization if wanted.
 * Set Interval for datapolling
 */
connection = connectDatabase();


config.datamining.initialisation ? initDB() : console.log("No Initialisation");
setInterval(getData, config.datamining.interval);

function connectDatabase() {

    console.log("Connect to Database");
    return connection = Vertica.connect({
        host: config.database.host,
        user: config.database.user,
        password: config.database.password,
        database: config.database.database
    }, (err) =>  {if(err)console.error(err)});
}


/**
 * ##########################################################################
 * INITIALIZATION
 * ##########################################################################
 */

function initDB() {
    dropTable()
        .then(() => {
            return createDatabase();
        }).then(()=> {
            console.log("Initialized");
    });
}

function dropTable() {
    console.log("DROP TABLE");
    let query = "DROP TABLE IF EXISTS " + config.database.maintable;
    //query = "INSERT INTO sharevalues(timestamp,price,change,volume,delayedPrice,delayedPriceTime,symbol)  VALUES ('2017-09-13 4:02:15',32.14,-0.27,5288150,32.12,'2017-09-13 3:47:14','CSCO')";
    return doQuery(query);
}

function createDatabase() {
    let query = "CREATE TABLE IF NOT EXISTS " + config.database.maintable +
        "(timestamp TIMESTAMP" +
        ", price numeric(5,2)" +
        ",change numeric(5,2)" +
        ",volume integer" +
        ",delayedPrice numeric(5,2)" +
        ",delayedPriceTime timestamp" +
        ",symbol varchar(6)" +
        ",PRIMARY KEY(symbol,timestamp));";
    console.log("CREATE NEW TABLE");
    return doQuery(query,true);
}


function doQuery(query) {
    return new Promise((resolve, reject) => {
        connection.query(query,(err, result)=> {
            if (err) reject(err);
            else resolve(result);
        });
    });
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

    config.datamining.symbols.forEach(company => {
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

function saveInDb(body) {
    var values = {
        "symbol": body.symbol,
        "price": body.latestPrice,
        "volume": body.latestVolume,
        "change": body.change,
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
    
    return doQuery(querys,true).then(()=>{},err => console.log(err));
}