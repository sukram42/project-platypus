import React from 'react';
import ReactDOM from 'react-dom';

import '../scss/index.scss';

import {BrowserRouter, Route, Switch} from "react-router-dom"

import HomeComponent from './views/home.component';
import DatabaseComponent from './views/database.component';
import ServerComponent from './views/server.component';
import CompaniesComponent from './views/companies.component';
import Index from './views/index.component';

const element = document.getElementById('content');
ReactDOM.render(
  <BrowserRouter >
    <Switch>
      <Route path="/home" component={HomeComponent}/>
      <Route path="/database" component={DatabaseComponent}/>
      <Route path="/server" component={ServerComponent}/>
      <Route path="/companies" component={CompaniesComponent}/>
      <Route path="/" component={Index}/>
    </Switch>
  </BrowserRouter>, element);

document.body.classList.remove('loading');
