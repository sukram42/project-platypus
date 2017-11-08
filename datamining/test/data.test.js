/**
 * Created by boebel on 18.09.2017.
 */

const chai = require('chai');
const sinon = require('sinon');

const data = require('../data');

chai.should();


describe("Datascript", function () {
    describe("Database things", function () {
        it("should connect to database",async function(){
            let result = await data.connectDatabase();
            result.should.be.a('object');
        })
        it("should drop Table if not exists", async function () {
            let result = await data.dropTable();
            result.status.should.equal('DROP TABLE');
        });
        it("should create Table", async function () {
            let result = await data.createDatabase();
            result.status.should.equal('CREATE TABLE');
        });

    });
    describe("help functions", function () {
        it("should get urls", async function () {
            let result = await data.getURLs();
            result.should.be.a('array');
        });
    });
});