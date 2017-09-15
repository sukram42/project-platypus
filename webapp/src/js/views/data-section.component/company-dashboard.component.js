/**
 * Created by boebel on 14.09.2017.
 */

import React, {Component} from 'react';


import Heading from 'grommet/components/Heading';
import Image from 'grommet/components/Image';
import Box from 'grommet/components/Box';
import DataStore from '../../stores/DataStore';
import * as DataActions from '../../actions/DataActions';
import PriceChartComponent from "./price-chart.component";

export default class CompanyDashboardComponent extends Component {

  constructor() {
    super();

    this.getCompanyData = this.getCompanyData.bind(this);
    this.getCompanyInformation = this.getCompanyInformation.bind(this);

    this.state = {
      companyName: "",
      companyData: []
    }
  }

  /**
   * Gets CompanyData from DataStore
   */

  getCompanyData() {

    console.log("data", DataStore.getCompanyData(this.props.company));
    this.setState({
      companyData: DataStore.getCompanyData(this.props.company)
    });
  }

  getCompanyInformation() {
    this.setState({
      companyInformation: DataStore.getCompanyInformation(this.props.company)
    })
  }

  componentWillMount() {
    console.log('data_changed_' + this.props.company.toUpperCase());
    DataStore.on('data_changed_' + this.props.company.toUpperCase(), this.getCompanyData);
    DataStore.on('info_changed_' + this.props.company.toUpperCase(), this.getCompanyInformation);


    DataActions.fetchCompanyData(this.props.company);
    this.state.interval = DataActions.startCompanyPolling(this.props.company);
    DataActions.fetchCompanyInformation(this.props.company);
  }

  componentWillUnmount() {

    DataStore.removeListener('data_changed_' + this.props.company.toUpperCase(), this.getCompanyData);
    DataStore.removeListener('info_changed_' + this.props.company.toUpperCase(), this.getCompanyInformation);
    DataActions.stopCompanyPolling(this.state.interval);
  }


  render() {
    let companyInformation = this.state.companyInformation;
    return (
      <Box full="vertical" pad={{"horizontal":"large","vertical":"none"}}>
        <Box direction="row" full="horizontal">
          <Box align="start">
            <Image size="small"
                   src={'https://storage.googleapis.com/iex/api/logos/' + this.props.company + '.png'}/>
          </Box>
          <Box align="start" full={"horizontal"} pad="medium">
            <Heading tag="h1" margin='none'>
              {companyInformation ? this.state.companyInformation.companyName : ""}
            </Heading>
            <Heading tag="h2" margin='none'>
              {companyInformation ? this.state.companyInformation.symbol : ""}
            </Heading>
          </Box>

        </Box>

        <Box>
          <PriceChartComponent values={this.state.companyData}/>
        </Box>
      </Box>
    );
  }
}