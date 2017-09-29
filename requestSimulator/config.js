/**
 * Created by boebel on 13.09.2017.
 */

var standards = {
    requests:{
        port:3002,
        autostart: false,
        startRequests:250,
        iterationSpan:1000
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
        database: {
            host: '192.168.99.100',
            port: '5433',
            db: 'docker',
            user: 'dbadmin',
            passwort: 'sd',
            maintable: 'sharevalues',
            requestTable:'requests'
        }, certs:{
            key: 'certs/key.pem',
            cert: 'certs/cert.pem'
        },
        requests: standards.requests,
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
        server: {
            host: '127.0.0.1',
            port: '3000'
        }, certs:{
            key: 'certs/key.pem',
            cert: 'certs/cert.pem'
        },
        requests: standards.requests,
        database: {
            host: '172.17.0.3',
            port: '5433',
            db: 'docker',
            user: 'dbadmin',
            passwort: 'sd',
            maintable: 'sharevalues',
            requestTable:'requests'
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