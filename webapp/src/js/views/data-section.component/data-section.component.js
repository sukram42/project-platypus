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

export default class DataSectionComponent extends React.PureComponent {

  constructor() {
    super();

    this.state = {
      max: {}
    }

    this.getMax = this.getMax.bind(this);

  }

  componentWillUnmount() {
    DataStore.removeListener('company_max_changed', this.getMax);
  }

  componentDidMount(){
    DataStore.on('company_max_changed', this.getMax);
    DataActions.fetchMaxAndMin();

  }


  getMax() {
    this.setState({"max": DataStore.getMax()});
  }

  render() {

    let companies = this.props.companies;
    console.log("render data-section");

    return (
      <Box basis="full" pad={{"vertical": "none"}}>
        {companies && companies.length != 0 ?
          <Carousel persistentNav={false} style={{"width":"100%","height":"100%"}}>
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