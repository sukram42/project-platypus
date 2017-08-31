import React, { Component } from 'react';

import App from 'grommet/components/App';
import Header from 'grommet/components/Header';
import Section from 'grommet/components/Section';
import Title from 'grommet/components/Title';
import Toast from 'grommet/components/Toast';

import Home from './Home';

export default class BasicApp extends Component {


  render() {
    return (
      <App>
        <Header></Header>
        <Section>
          <Title>Hello World</Title>
          <p>Hello from a Grommet page!</p>
          <button primary>hallo</button>
          <Home></Home>
        </Section>
      </App>
    );
  }


}
