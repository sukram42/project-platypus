/**
 * Created by boebel on 14.09.2017.
 */

import React from 'react';

import CompanyDashboardComponent from './company-dashboard.component.js';
import Spinning from 'grommet/components/icons/Spinning';


import Carousel from 'grommet/components/Carousel';
import Headline from 'grommet/components/Headline';
import Box from 'grommet/components/Box';


import DataStore from '../../stores/DataStore';


import * as DataActions from '../../actions/DataActions';
import ReactSiema from "react-siema";

export default class DataSectionComponent extends React.PureComponent {

  constructor() {
    super();

    this.getCompanyInformation = this.getCompanyInformation.bind(this);
    this.getCompanyData = this.getCompanyData.bind(this);

    this.state = {
      data: {},
      info: {}
    };


    this.getMax = this.getMax.bind(this);
  }

  componentWillUnmount() {
    DataStore.removeListener('info_changed', this.getCompanyInformation);
    DataStore.removeListener('data_changed', this.getCompanyData);

  }

  componentDidMount() {
    DataActions.fetchMaxAndMin();

  }

  componentWillMount() {
    // this.getPriceArray();
    DataStore.on('info_changed', this.getCompanyInformation);
    DataStore.on('data_changed', this.getCompanyData);
  }

  getCompanyInformation() {
    this.setState({info: DataStore.getCompanyInformation()});
  }

  getCompanyData() {
    let data = DataStore.getCompanyData();
    this.setState({data});
  }

  getMax() {
    this.setState({"max": DataStore.getMax()});
  }

  render() {

    let keys = Object.keys(this.state.data);

    keys.sort();


    return (
      <Box  pad={{"vertical": "none"}} style={{"height":"100%"}} colorIndex="neutral-1"  className="carousel-container">
        {keys.length > 0 ?
          <ReactSiema className="siemasse">
            {keys.map((key, index) =>
            <div key={key}>
               <CompanyDashboardComponent max={this.state.max}
                                         key={key}
                                         companyData={this.state.data[key]}
                                         companyInformation={this.state.info[key]} />
            </div>
            )}

          </ReactSiema>
          :
          <Box style={{"height": "100%"}} className="loading-screen" justify="center">
            <svg>
              <rect x="40%" y="50%" width="20%" height="30%" fill="none" stroke="#01a982" strokeWidth="10px"/>
            </svg>
          </Box>
        }
      </Box>
    );
  }
}

