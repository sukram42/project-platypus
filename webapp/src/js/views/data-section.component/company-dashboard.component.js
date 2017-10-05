/**
 * Created by boebel on 14.09.2017.
 */

import React, {Component} from 'react';


import Heading from 'grommet/components/Heading';
import Image from 'grommet/components/Image';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Responsive from 'grommet/utils/Responsive';

import DataStore from '../../stores/DataStore';


import * as DataActions from '../../actions/DataActions';
import PriceChartComponent from "./price-chart.component";

import Info from 'grommet/components/icons/base/Info';


import InformationLayerComponent from "./information-layer.component";

import {Hidden, Row, Col, Visible} from "react-grid-system";

export default class CompanyDashboardComponent extends Component {

  constructor(props) {
    super(props);

    this.getCompanyData = this.getCompanyData.bind(this);
    this.getCompanyInformation = this.getCompanyInformation.bind(this);
    this.onResponsive = this.onResponsive.bind(this);

    DataStore.on('info_changed_' + this.props.company.toUpperCase(), this.getCompanyInformation);
    DataStore.on('data_changed_' + this.props.company.toUpperCase(), this.getCompanyData);

    DataActions.fetchCompanyData(this.props.company);

    this.state = {
      companyName: "",
      companyData: [],
      show: false,
      markerPos: undefined,
    }
  }


  componentWillUnmount() {

    DataStore.removeListener('data_changed_' + this.props.company.toUpperCase(), this.getCompanyData);
    DataStore.removeListener('info_changed_' + this.props.company.toUpperCase(), this.getCompanyInformation);


    DataActions.stopCompanyPolling(this.state.interval);
    this.responsive.stop();
  }

  componentDidMount() {
    this.responsive = Responsive.start(this.onResponsive);
    this.state.interval = DataActions.startCompanyPolling(this.props.company);
    DataActions.fetchCompanyInformation(this.props.company);
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.props.max != nextProps.max)
  //     return true;
  //   else if (this.state != nextState)
  //     return true;
  //
  //   return false;
  // }

  onResponsive(small) {
    this.setState({small});
  }

  /**
   * Gets CompanyData from DataStore
   */
  getCompanyData() {

    this.setState({
      companyData: DataStore.getCompanyData(this.props.company)
    });
  }


  getCompanyInformation() {
    this.setState({
      companyInformation: DataStore.getCompanyInformation(this.props.company)
    })
  }


  render() {
    let companyInformation = this.state.companyInformation;
    let show = this.state.show;
    // let markerPos = this.state.markerPos;/*
    let markerPos = 0;
    let small = this.state.small;


    return (
      <Box pad={{"between": "medium", "vertical": "medium"}}>
        <Row>
          <Col xl={1} sm={1} xs={1}/>
          {/*Picture*/}
          <Col xl={2} sm={2} xs={0}>
            <Box align="start">
              <Image size="small"
                     style={{"borderRadius": "50%"}}
                     src={'https://storage.googleapis.com/iex/api/logos/' + this.props.company + '.png'}
              />
            </Box>
          </Col>
          {/*Headings*/}
          <Col xl={5} sm={7} xs={10} style={{"paddingTop": "2%"}}>
            <Box align="start" style={{"textAlign": "left"}}>
              <Heading tag="h1">
                {companyInformation ? this.state.companyInformation.companyName : ""}
              </Heading>
              <Heading truncate={true} tag="h2">
                {companyInformation ? this.state.companyInformation.symbol : ""}

              </Heading>
              <Visible xs>
                <Button icon={<Info />}
                        label={!small ? "Information" : ""}
                        accent={true}
                        onClick={() => this.setState({show: true})}
                />
              </Visible>
            </Box>
          </Col>
          {/*Information Button */}
          <Col xl={2} sm={1} xs={0} style={{"paddingTop": "2%"}}>
            <Box >
              <Visible xl>
                <Button icon={<Info />}
                        label={!small ? "Information" : ""}
                        accent={true}
                        onClick={() => this.setState({show: true})}
                />
              </Visible>
            </Box>
            <Visible lg md sm>
              <Button
                accent={true}
                onClick={() => this.setState({show: true})}
                plain={false}
                primary={true}
                icon={<Info />}
              />
            </Visible>
          </Col>
          <Col xl={1} sm={1} xs={1}/>
        </Row>

        <PriceChartComponent small={small}
                             max={this.state.companyInformation && this.props.max ? this.props.max[this.state.companyInformation.symbol] : 0}
                             values={this.state.companyData}
        />
        {show ? (
          <InformationLayerComponent onClose={() => this.setState({show: false})}
                                     information={companyInformation}
          />
        ) : ""}

      </Box>
    );
  }
}