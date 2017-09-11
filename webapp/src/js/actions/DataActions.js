/**
 * Created by boebel on 04.09.2017.
 */

import dispatcher from '../dispatchers/dispatcher';
import axios from 'axios';

export const POLLING_TIME= 10000;

export function fetchCompanyData(symbol) {
  axios.get('https://api.iextrading.com/1.0/stock/' + symbol + '/company')
    .then(response=>{
      dispatcher.dispatch({
        "type":'FETCH_COMPANY_ONE',
        "data": response.data
      })
    });
}

export function fetchData()
{
  //TODO Port ändern
  axios.get('http://localhost:3001/api/companies')
    .then(response=>{
      dispatcher.dispatch({
        "type":'FETCH_COMPANY_DATA',
        "data": response.data
      })
    });
}

export function fetchDatabaseStats()
{
  //TODO Port ändern
  axios.get('http://localhost:3001/api/database/stats')
    .then(response=>{
      dispatcher.dispatch({
        "type":'FETCH_DATABASE_STATS',
        "data": response.data
      })
    });
}
export function fetchDatabaseLog()
{
  //TODO Port ändern
  axios.get('http://localhost:3001/api/database/log')
    .then(response=>{
      dispatcher.dispatch({
        "type":'FETCH_DATABASE_LOG',
        "data": response.data
      })
    });
}
export function fetchDatabaseBuildInfo()
{
  //TODO Port ändern
  axios.get('http://localhost:3001/api/database/buildInfo')
    .then(response=>{
      dispatcher.dispatch({
        "type":'FETCH_DATABASE_BUILDINFO',
        "data": response.data
      })
    });
}

export function startPollingLog()
{
  if(!this.logInterval) {
    this.logInterval = setInterval(() => {
      fetchDatabaseLog();
    }, POLLING_TIME);
  }
}
export function stopPollingLog()
{
  if(this.logInterval){
    clearInterval(this.interval);
  }
}


export function startPolling()
{
  if(!this.interval) {
    this.interval = setInterval(() => {
      fetchData();
    }, POLLING_TIME);
  }
}
export function stopPolling()
{
  if(this.interval){
    clearInterval(this.interval);
  }
}


export function startPollingCompany(symbol)
{
  if(!this.interval) {
    this.companyInterval[symbol] = setInterval(() => {
      fetchCompanyData();
    }, POLLING_TIME);
  }
}
export function stopPollingCompany(symbol)
{
  if(this.companyInterval[symbol]){
    clearInterval(this.interval);
  }
}
