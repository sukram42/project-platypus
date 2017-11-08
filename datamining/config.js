/**
 * Created by boebel on 13.09.2017.
 */

const env = process.env;

var standards = {
      datamining: {
        initialisation: env.INITIALISATION || true,
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
            port: env.DATABASE_PORT ||'5433',
            db: env.DATABASE_NAME ||'docker',
            user: env.DATABASE_USER || 'dbadmin',
            password: env.DATABASE_PASSWORD  ||'password',
            maintable:  env.DATABASE_MAINTABLE|| 'sharevalues'
        },

        //server details
        server: {
            host: '127.0.0.1',
            port: '3001'
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
        database: {
            host: env.DATABASE_HOST || '10.3.16.146',
            port: env.DATABASE_PORT ||'5433',
            db: env.DATABASE_NAME ||'TWLON_data',
            user: env.DATABASE_USER || 'dbadmin',
            password: env.DATABASE_PASSWORD  || 'password',
            maintable:  env.DATABASE_MAINTABLE || 'sharevalues'
        },
        server: {
            host: '127.0.0.1',
            port: '3000'
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

};
module.exports = config;