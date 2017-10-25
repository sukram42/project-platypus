/**
 * @module Webapp/Backend/Company Name Cache
 * @description Module to locally cache the filenames
 * @author Markus Böbel
 */

'use strict';

var companyNames=[];

var exports = module.exports = {};

/**
 * Method to set a new set of names to the cache.
 * @param{Array} names
 */
exports.setCachedNames = function(names){
  companyNames = names;
}

/**
 * Method to get the names from the local cache
 * @returns {Array} Array of Names
 */
exports.getCachedNames = function () {
  if(companyNames.length===0)return null;
  return companyNames;
}