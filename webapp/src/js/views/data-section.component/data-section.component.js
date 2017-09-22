/**
 * Created by boebel on 14.09.2017.
 */

import React, {Component} from 'react';

import CompanyDashboardComponent from './company-dashboard.component';

import Carousel from 'grommet/components/Carousel';
import Headline from 'grommet/components/Headline';
import Box from 'grommet/components/Box';

import DataStore from '../../stores/DataStore';


import * as DataActions from '../../actions/DataActions';

export default class DataSectionComponent extends Component {

  constructor() {
    super();

    this.state={
      max:{}
    }

    this.getMax = this.getMax.bind(this);

    DataStore.on('company_max_changed', this.getMax);
    DataActions.fetchMaxAndMin();


  }
  componentWillUnmount() {
    DataStore.removeListener('company_max_changed', this.getMax);
  }

 shouldComponentUpdate(nextProps, nextState) {
   return !this.state.max !== nextState.max
 }

  getMax() {
    this.setState({"max":DataStore.getMax()});
  }
  render() {

    let companies = this.props.companies;

    return (
      <Box >
        {companies && companies.length != 0 ?
        <Carousel persistentNav ={true}>
          {companies.map((company, index) =>
                      <CompanyDashboardComponent max={this.state.max} key={index} company={company}/>
                    )}
        </Carousel>
          :
          <Headline>
          Sorry, It looks like, I do not have any data for you
          </Headline>
        }
      </Box>
    );
  }
}