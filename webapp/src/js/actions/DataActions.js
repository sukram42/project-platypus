/**
 * Created by boebel on 04.09.2017.
 */

import dispatcher from '../dispatchers/dispatcher';
import axios from 'axios';

export function fetchCompanyData(symbol) {
  console.log("Action aufgerufen");
  axios.get('https://api.iextrading.com/1.0/stock/' + symbol + '/company')
    .then(response=>{
      dispatcher.dispatch({
        "type":'FETCH_COMPANY_DATA',
        "data": response.data
      })
    })

}
