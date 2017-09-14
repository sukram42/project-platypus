/**
 * Created by boebel on 14.09.2017.
 */

import React, {Component} from 'react';


import Box from 'grommet/components/Box';
import Headline from 'grommet/components/Headline';
import DataStore from '../../stores/DataStore';
import * as DataActions from '../../actions/DataActions';

export default class CompanyDashboardComponent extends Component {

  constructor() {
    super();

    this.getCompanyData = this.getCompanyData.bind(this);
    this.getCompanyInformation = this.getCompanyInformation.bind(this);

    this.state = {
      companyName: "",
      companyData:[]
    }
  }
    /**
     * Gets CompanyData from DataStore
     */

    getCompanyData()
    {
      this.setState({
        companyData: DataStore.getCompanyData(this.state.companyName)
      });
    }

    getCompanyInformation()
    {
      this.setState({
        companyInformation: DataStore.getCompanyInformation(this.props.company)
      })
    }

    componentWillMount()
    {
      console.log("Mounted");

      DataStore.on('data_changed_' + this.props.company.toUpperCase(), this.getCompanyData);
      DataStore.on('info_changed_' + this.props.company.toUpperCase(), this.getCompanyInformation);

      console.log(this.props.company);

      DataActions.fetchCompanyInformation(this.props.company);
      this.state.interval = DataActions.startCompanyPolling(this.props.company);
    }

    componentWillUnmount()
    {
      DataStore.removeListener('data_changed_' + this.props.company.toUpperCase(), this.getCompanyData);
      DataStore.removeListener('info_changed_' + this.props.company.toUpperCase(), this.getCompanyInformation);
      DataActions.stopCompanyPolling(this.state.interval);
    }


    render()
    {
      let company = this.props.company;

      return (
        <Box pad='none' fill={true}
             colorIndex='neutral-3'>
          <Headline margin='none'>
            {JSON.stringify(this.state.companyInformation)}
          </Headline>
        </Box>
      );
    }
}