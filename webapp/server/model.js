/**
 * Created by Boebel on 04.09.2017.
 */

const mongo = require('mongodb').MongoClient;
const Rx = require('rxjs/Rx');


const MONGO_URL = 'mongodb://192.168.99.100:27017/datamining';
const COLLECTION_NAME = 'companies';


var exports = module.exports = {};

function connectDB() {
  return new Promise((resolve, reject) => {
    mongo.connect(MONGO_URL, (err, db) => {
      if (err) reject(err);
      else resolve(db);
    });
  })
}

exports.getAll  = function(){
   return find();
}

exports.getCompanyInformation = function (symbol) {
    return find({"symbol":symbol.toUpperCase()});
}

 exports.getCompanyInformationFromDate = function (symbol,date) {
     return find({symbol,"values.date":date});
 }
function find(element)
{
  return connectDB().then(db => {
    let cursor = db.collection(COLLECTION_NAME).find(element);
    return getQueryObservable(cursor)
    db.close();
  }, (err) => console.log("ERROR ", err));
}

function getQueryObservable(cursor)
{
  return erg = Rx.Observable.create(observer => {

    cursor.toArray((err,doc)=>{
        if(doc)
          observer.next(doc);
        else observer.error(err);
    });
  });
}



