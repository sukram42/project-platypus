/**
 * Created by boebel on 09.10.2017.
 */

'use strict';

var companyNames=[];
console.log(typeof companyNames)

var exports = module.exports = {};

exports.setCachedNames = function(names){
  companyNames = names;
}

exports.getCachedNames = function () {
  if(companyNames.length===0)return null;
  return companyNames;
}