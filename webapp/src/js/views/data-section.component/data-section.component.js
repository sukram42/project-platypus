/**
 * Created by boebel on 14.09.2017.
 */

import React, {Component} from 'react';

import CompanyDashboardComponent from './company-dashboard.component';

import Carousel from 'grommet/components/Carousel';
import Headline from 'grommet/components/Headline';

export default class DataSectionComponent extends Component {

  constructor() {
    super();

  }


  render() {

    let companies = this.props.companies;

    return (
      <Carousel infinite={false}
                persistentNav={false}>
        {companies && companies.length != 0 ?
          companies.map((company, index) =>
            <CompanyDashboardComponent key={index} company={company}></CompanyDashboardComponent>
          )
          :
          <Headline margin='none'>
            Sorry, It looks like, I do not have any data for you
          </Headline>
        }
      </Carousel>
    );
  }
}