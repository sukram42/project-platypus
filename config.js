/**
 * Created by boebel on 13.09.2017.
 */
var config = {
development: {
    //url to be used in link generation
    url: 'http://my.site.com',
    //mongodb connection settings
    database: {
        host:   '192.168.99.100',
        port:   '',
        db:     'docker',
        user:   'dbadmin',
        passwort:'sd',
        maintable : 'sharevalues'
    },
    //server details
    server: {
        host: '127.0.0.1',
        port: '3422'
    },
     datamining: {
        initialisation: true,
        interval: 5000,
        symbols: ["AAPL", "HPE", "IBM", "DXC", "DVMT", "CSCO", "INTC", "SAP", "ORCL"]
    }
},
production: {
    //url to be used in link generation
    url: 'http://my.site.com',
    //mongodb connection settings
    database: {
        host:   '192.168.99.100',
        port:   '',
        db:     'docker',
        user:   'dbadmin',
        passwort:'sd',
        maintable : 'sharevalues'
    },
    //server details
    server: {
        host:   '127.0.0.1',
        port:   '3421'
    },
    datamining: {
        initialisation: true,
        interval: 5000,
        symbols: ["AAPL", "HPE", "IBM", "DXC", "DVMT", "CSCO", "INTC", "SAP", "ORCL"]
    }
}
};
module.exports = config;