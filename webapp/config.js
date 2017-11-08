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
    //database connection settings
    database: {
      host: env.DATABASE_HOST || '10.3.16.146',
      port: env.DATABASE_PORT || '5433',
      db: env.DATABASE_NAME || 'TWLON_data',
      user: env.DATABASE_USER || 'dbadmin',
      password: env.DATABASE_PASSWORD || 'password',
      maintable: env.MAINTABLE ||'sharevalues'
    },
    certs:{
      key: 'certs/key.pem',
      cert: 'certs/cert.pem'
    },
    jmmaster: {
      host: env.JMETER_HOST || 'jmmaster',
      port: env.JMETER_PORT || 3007,
      tests:['loadtest.jmx'],
      count: env.JMETER_COUNT || 3
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
      host: env.DATABASE_HOST || '10.3.16.146',
      port: env.DATABASE_PORT ||'5433',
      db: env.DATABASE_NAME ||'TWLON_data',
      user: env.DATABASE_USER || 'dbadmin',
      password: env.DATABASE_PASSWORD  || 'password',
      maintable:  env.DATABASE_MAINTABLE || 'sharevalues'
    },
    certs:{
        key: 'certs/key.pem',
        cert: 'certs/cert.pem'
    },
    server: {
      host: env.SERVER_HOST || '127.0.0.1',
      port: env.SERVER_PORT ||'3000'
    },
    jmmaster: {
      host: env.JMETER_HOST || 'jmmaster',
      port: env.JMETER_PORT || 3007,
      tests:['loadtest.jmx'],
      count: env.JMETER_COUNT || 3
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