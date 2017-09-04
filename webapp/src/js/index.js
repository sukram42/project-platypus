import React from 'react';
import ReactDOM from 'react-dom';

import '../scss/index.scss';

import {BrowserRouter, Route, Switch} from "react-router-dom"

import Home from './views/Home';
import App from './views/App';

const element = document.getElementById('content');
ReactDOM.render(
  <BrowserRouter >
    <Switch>
      <Route path="/app" component={Home}/>
      <Route path="/" component={App}/>
    </Switch>
  </BrowserRouter>, element);

document.body.classList.remove('loading');
