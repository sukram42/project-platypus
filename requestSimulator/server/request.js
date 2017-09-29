/**
 * Created by boebel on 28.09.2017.
 */


const log4js = require('log4js');
const request = require('request');
const moment = require('moment');
const fs = require('fs');
const path = require('path');

const model = require('./model');
/**
 * Sets Environment variables and connects to config script
 * @type {*}
 */
const env = process.env.NODE_ENV || 'development';
const config = require('../config')[env];

const iterationSpan = process.env.ITERATION_SPAN || config.requests.iterationSpan;
var requests = process.env.REQUESTS || config.requests.startRequests || 10;
var interval;

const url = `https://${config.server.host}:${config.server.port}/api/companies/HPE?count=30`;

log4js.configure(config.log);
const logger = log4js.getLogger('datalog', 'console');


var exports = module.exports = {};

exports.startRequesting = function () {
    if (!interval) {
        interval = setInterval(iterationHandler, iterationSpan);
        logger.info("Requesting started successfully")
        return "Requesting started successfully"
    } else {
        logger.info('There is already a Requesting on the go');
        return 'There is already a Requesting on the go';
    }
}

exports.stopRequesting = function () {
    if (interval) {
        clearInterval(interval);
        interval = null;
        logger.info("Requesting stopped successfully");
        return "Requesting stopped successfully";

    } else {
        logger.info("No requesting to stop");
        return "No requesting to stop";
    }
}
exports.isRequesting = function () {
    return !!interval;
}

exports.setRequests = function (x) {
    if (+x)
        requests = +x;
}

exports.getRequests = function () {
    return requests;
}


function iterationHandler() {
    logger.info(`${requests} going to be made in ${iterationSpan} milliseconds. On ${url}`);
    for (let x = 0; x < requests; x++) {
        setTimeout(() => doRequest(x), Math.abs(Math.random() * iterationSpan));
    }

    model.commitValues();

}

function doRequest(index) {

    var values = [];

    let options = {
        url,
        rejectUnauthorized: false, //TODO INSECURE?
        time: true,
        pool: {maxSockets: 30}
    }

    request.get(options, (err, response, body) => {
        if (!err) {
            model.writeRequest(
                {
                    start: moment(response.timingStart).format("YYYY-MM-DD h:mm:ss"),
                    elapsedTime: response.elapsedTime,
                    successful: true
                });
        } else {
            logger.error(err);
            model.writeRequest({
                start: moment().format("YYYY-MM-DD h:mm:ss"),
                elapsedTime: -1,
                successful: false

            });
            exports.stopRequesting();
        }
    });

}

if (config.requests.autostart) exports.startRequesting();


