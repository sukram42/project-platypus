/**
 * @file Configuration File
 * @author Markus Böbel
 * Created by boebel on 13.09.2017.
 */

const env = process.env;

var standards = {
  datamining: {
    initialisation: true,
    interval: 5000,
    symbols: ["AAPL", "HPE", "IBM", "DXC", "DVMT", "CSCO", "INTC", "SAP", "ORCL"]
  },
  polling: 5000
}

var config = {
  development: {

    //url to be used in link generation
    url: 'http://my.site.com',
    //database connection settings
    database: {
      host: env.DATABASE_HOST || '192.168.99.100',
      port: env.DATABASE_PORT || '5433',
      db: env.DATABASE_NAME || 'docker',
      user: env.DATABASE_USER || 'dbadmin',
      passwort: '',
      maintable: env.MAINTABLE ||'sharevalues'
    },
    certs:{
      key: 'certs/key.pem',
      cert: 'certs/cert.pem'
    },
    //server details
    server: {
      host: env.SERVER_HOST || '127.0.0.1',
      port: env.SERVER_PORT ||'3001'
    },
    datamining: standards.datamining,
    polling: standards.polling,
    log: {
      appenders: {
        datalog: {type: 'file', filename: 'data.log'},
        console: {type: 'console'}
      },
      categories: {default: {appenders: ['datalog', 'console'], level: 'all'}}
    }
  },
  production: {
    //url to be used in link generation
    url: 'http://my.site.com',
    database: {
      host: env.DATABASE_HOST ||'172.17.0.3',
      port: env.DATABASE_PORT || '5433',
      db: env.DATABASE_NAME || 'docker',
      user: env.DATABASE_USER || 'dbadmin',
      passwort: '',
      maintable: env.MAINTABLE ||'sharevalues'
    },
    certs:{
        key: 'certs/key.pem',
        cert: 'certs/cert.pem'
    },
    server: {
      host: env.SERVER_HOST || '127.0.0.1',
      port: env.SERVER_PORT ||'3000'
    },
    datamining: standards.datamining,
    polling: standards.polling,
    log: {
      appenders: {
        datalog: {type: 'file', filename: 'data.log'},
        console: {type: 'console'}
      },
      categories: {default: {appenders: ['datalog', 'console'], level: env.DEBUG_LEVEL || 'all'}}
    }
  },
};
module.exports = config;