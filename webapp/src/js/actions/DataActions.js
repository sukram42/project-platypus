/**
 * Created by boebel on 04.09.2017.
 */

import dispatcher from '../dispatchers/dispatcher';
import axios from 'axios';

export const POLLING_TIME= 10000;

export function fetchCompanyData(symbol) {
  console.log("Action aufgerufen");
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
  console.log("SYMBOL",symbol);
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
