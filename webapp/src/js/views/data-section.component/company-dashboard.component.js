/**
 * Created by boebel on 14.09.2017.
 */

import React, {Component} from 'react';



import Heading from 'grommet/components/Heading';
import Image from 'grommet/components/Image';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';



import Info from 'grommet/components/icons/base/Info';


import InformationLayerComponent from "./information-layer.component";

import {Hidden, Container, Row, Col, Visible} from "react-grid-system";


import ValueFieldComponent from "./dashboard/value-field.component";
import PriceChartComponent from "./dashboard/price-chart.component";

export default class CompanyDashboardComponent extends React.PureComponent {

  constructor(props) {
    super(props);


    this.state = {
      show: false,
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.companyData !== nextProps.companyData)
      return true;
    if (this.state.markerPos !== nextState.markerPos)
      return true;
    if (this.state.show !== nextState.show) {
      return true;
    }
    return false;
  }

  handleClick() {
    this.setState({show: true});
  }

  render() {
    let companyInformation = this.props.companyInformation;
    let show = this.state.show;


    return (
      <Box className="company-dashboard-box" justify="center" pad={{"vertical": "small", "between": "medium"}}>
        {companyInformation?<div className="information-div" onClick={() => this.handleClick()}>
          <Button icon={<Info />}
                  onClick={() => this.handleClick()}
          />
        </div>:""}

        {companyInformation?
        <div>

        <Row>
          <Col xl={1} sm={1} xs={1}/>
          <Col xl={10} sm={10} xs={10}>

            <Box direction="row" pad={{"between": "large"}} basis="small">
              <Box className="heading-col-box">
                <Image
                  className="company-icon"
                  fit="contain"
                  src={companyInformation ? `img/icons/${companyInformation.symbol}.png` : ""}
                />
              </Box>
              <Box justify="center" textAlign="left">
                <Box className="heading-col-box">
                  <Heading tag="h1">
                    {companyInformation ? companyInformation.companyName : ""}
                  </Heading>
                  <Heading truncate={true} tag="h2">
                    {companyInformation ? companyInformation.symbol : ""}
                  </Heading>
                  <Visible xs>
                    <Button icon={<Info />}
                            label={""}
                            accent={true}
                            onClick={() => this.setState({show: true})}
                    />
                  </Visible>
                </Box>

              </Box>
            </Box>
          </Col>
          <Col xl={1} sm={1} xs={1}/>
        </Row>
        <Row>
          <Col sm={1} xl={1} xs={1}/>
          <Col sm={10} xl={10} xs={10}>
            <PriceChartComponent symbol={companyInformation.symbol} companyData={this.props.companyData}/>
          </Col>

          <Col sm={1} xl={1} xs={1}/>
        </Row>
        <Row>
          <Col sm={1} xl={1} xs={1}/>
          <Col sm={10} xl={10} xs={10} debug>
            <svg width="100%" height={10}>
              <line strokeLinecap="round"
                    x1="0%" y1="0" x2="100%" y2="0"
                    stroke="white" strokeWidth="5"/>
            </svg>
          </Col>
          <Col sm={1} xl={1} xs={1}/>
        </Row>
        <Row >

          <Col sm={1} xl={1} xs={1}/>
          <Col sm={3} xl={3} xs={3}>
            <ValueFieldComponent
              units='$'
              aligned="start"
              trend={true}
              symbol={companyInformation.symbol}
              listener="PRICE"
            />
          </Col>
          <Col sm={4} xl={4} xs={4}>
            <ValueFieldComponent
              symbol={companyInformation.symbol}
              listener="TIMESTAMP"
            />
          </Col>
          <Col sm={3} xl={3} xs={3}>
            <ValueFieldComponent
              units='%'
              symbol={companyInformation.symbol}
              listener='CHANGE'
              aligned="end"
            />
          </Col>
          <Col sm={1} xl={1} xs={1}/>
        </Row>
        </div>
        : ""}

        {!companyInformation?<Box style={{"height": "100%"}} className="loading-screen" justify="center">
          <svg>
            <rect x="40%" y="50%" width="20%" height="30%" fill="none" stroke="#01a982" strokeWidth="10px"/>
          </svg>
        </Box>:""}
        {show ? (
          <InformationLayerComponent onClose={() => this.setState({show: false})}
                                     information={companyInformation}
                                     visible={show}
          />
        ) : ""}

      </Box>
    );

  }
}


