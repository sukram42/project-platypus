import React from 'react';
import ReactDOM from 'react-dom';

import '../scss/index.scss';

import {BrowserRouter, Route, Switch} from "react-router-dom"

import Index from './views/index.component';

const element = document.getElementById('content');
ReactDOM.render(
  <BrowserRouter >
    <Switch>
      <Route path="/" component={Index}/>
    </Switch>
  </BrowserRouter>, element);

document.body.classList.remove('loading');
//