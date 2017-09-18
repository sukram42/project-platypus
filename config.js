/**
 * Created by boebel on 13.09.2017.
 */

var standards = {
    database: {
        host: '172.17.0.3',
        port: '5433',
        db: 'docker',
        user: 'dbadmin',
        passwort: 'sd',
        maintable: 'sharevalues'
    },
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
        database: standards.database,
        //server details
        server: {
            host: '127.0.0.1',
            port: '3001'
        },
        datamining: standards.datamining,
        polling: standards.polling,
        log:{
            appenders: { datalog: { type: 'file', filename: 'data.log' },
                         console: { type: 'console'}},
            categories: { default: { appenders: ['datalog','console'], level: 'all' } }
        }
    },
    production: {
        //url to be used in link generation
        url: 'http://my.site.com',
        database: standards.database,
        server: {
            host: '127.0.0.1',
            port: '3000'
        },
        datamining: standards.datamining,
        polling: standards.polling,
        log:{
            appenders: { datalog: { type: 'file', filename: 'data.log' }},
            categories: { default: { appenders: ['datalog'], level: 'Error' } }
        }
    },

};
module.exports = config;