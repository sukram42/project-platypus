/**
 * Created by boebel on 14.09.2017.
 */

import React, {Component} from 'react';

import CompanyDashboardComponent from './company-dashboard.component';

import Carousel from 'grommet/components/Carousel';
import Headline from 'grommet/components/Headline';
import Box from 'grommet/components/Box';


export default class DataSectionComponent extends Component {

  constructor() {
    super();

  }


  render() {

    let companies = this.props.companies;

    return (
      <Box>
        <Carousel persistentNav ={false}>
                  {companies && companies.length != 0 ?
                    companies.map((company, index) =>
                      <CompanyDashboardComponent key={index} company={company}/>
                    )
                    :
                    <Headline margin='none'>
                      Sorry, It looks like, I do not have any data for you
                    </Headline>
                  }
        </Carousel>
      </Box>
    );
  }
}