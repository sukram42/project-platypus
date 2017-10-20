const util = require('util');
const childprocess = require('child_process');
const exec = childprocess.exec;

const config = require('./config');
const glob = require("glob");

var exports = module.exports = {};

var started = false;
var query;


/**
 * Returns if test already started
 */
exports.isTestStarted = function (req, res) {
    console.log(started);
    res.status(200).send(started);
}

/**
 * TODO QUERY.kill() not working yet
 * Kills active process
 * @param req
 * @param res
 */
exports.stopProcess = async function (req,res) {
    if(query) {
        query.kill();
        res.status(200).send("Process killed");
    }else res.status(304).send("No Process to be killed");

}

/**
 * Starts test
 * @param req Request object
 * @param res Resolve object
 * @returns {Promise.<void>}
 */
exports.startTest = function (req, res) {

    if (started) {
        res.status(304).send("Already Started");
    } else {

        let filename = req.body.filename;
        let clients = req.body.clients;

        if (!filename) {
            res.status(400).send("BAD REQUEST");
        }
        else if (clients && clients.constructor !== Array) {
            res.status(400).send("CLIENTS MUST BE AN ARRAY");
        }
        else {
            let clientQuery = clients ? `-R${clients.toString()}` : "";
            try {

                query = exec(`jmeter -n -t /etc/tests/${filename} ${clientQuery}`);

                query.stdout.on('data', data => {
                    console.log(data);
                });
                query.stderr.on('data', data => {
                    console.log(data);
                });
                query.on('close',data=>{
                    started = false;
                    query = null;
                });
                // let {stdout, stderr} = await exec(`cd ../.. && dir`);
                started = true;
                res.status(200).send(`Test ${filename} started`);
            } catch (err) {
                console.error(err);
                res.status(500).send(err);
            }
        }

    }
}