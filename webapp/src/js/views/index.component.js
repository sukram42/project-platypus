import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import Article from 'grommet/components/Article';
import Section from 'grommet/components/Section';
import Headline from 'grommet/components/Headline';


import DataSectionComponent from './data-section.component/data-section.component';
import DataStore from '../stores/DataStore';
import * as DataActions from '../actions/DataActions';

import SplashScreenComponent from "./index.component/splash-screen.component";
import OverviewComponent from "./index.component/overview.component";
import RequestSectionComponent from "./request-section.component/request-section.component";
import PerfProfiler from "../performance_checker";
import StartTestComponent from "./start-test.component/start-test.component";


export default class IndexCompany extends React.PureComponent {

  constructor() {
    super();
  }


  render() {
    return (
      <Article scrollStep={true} className="main-article" controls={true}>
        <Section pad="none"
                 className="landing-section"
                 margin="none"
                 justify='center'
                 full='vertical'
                 texture="img/big-ben_blur.webp"
        >
          <SplashScreenComponent />
        </Section>

        <Section
          pad="none"
          justify='center'
          margin="none"
          full='vertical'
          colorIndex="accent-3">
          <OverviewComponent />
        </Section>
        <Section pad="none"
          // justify='center'
                 margin="none"
                 full='vertical'
                 ref="companies"
        >
          <DataSectionComponent/>
        </Section>

        <Section pad="none"
                 justify='center'
                 margin="none"
                 align="center"
                 full='vertical'
                 className="start-test"
        >
          <StartTestComponent/>
        </Section>
      </Article>
    );
  }


}
