/**
 * Created by boebel on 08.09.2017.
 */
/**
 * @module Webapp/Backend/Database
 * @desc Module to retrieve Information about the Database
 * @deprecated Not working anymore, because of the switch to vertica.
 *
 * Created by Boebel on 04.09.2017.
 */

const mongo = require('mongodb').MongoClient;
const Rx = require('rxjs/Rx');


let MONGO_URL = 'mongodb://192.168.99.100:27017/';
let dbName = "datamining"
const COLLECTION_NAME = 'companies';


var exports = module.exports = {};



function connectDB(admin) {

  let dbUrl = MONGO_URL  + (!admin?dbName:"");

  return new Promise((resolve, reject) => {
    mongo.connect(dbUrl, (err, db) => {
      if (err) reject(err);
      else resolve(db);
    });
  })
}

exports.getLog = function () {
  return connectDB(true).then((db) => {
       return db.command({ getLog : "global" });
    }
  )
}

exports.getBuildInfo = function () {
  return connectDB(false).then((db) => {
      return db.command({ buildInfo: 1 });
    }
  )
}
exports.getStats = function () {
  return connectDB(false).then((db) => {
      return db.command({ dbStats: 1, scale: 1024 });
    }
  )
}





