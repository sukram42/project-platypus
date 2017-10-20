
const config={
    testPath:  process.env.TEST_PATH || 'etc/tests/',
    port: process.env.BACKEND_PORT ||3007,
    log: {
        appenders: {
            datalog: {type: 'file', filename: 'data.log'},
            console: {type: 'console'}
        },
        categories: {default: {appenders: ['datalog', 'console'], level: 'all'}}
    }
}

module.exports = config;
