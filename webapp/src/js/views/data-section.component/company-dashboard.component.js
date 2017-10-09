/**
 * Created by boebel on 14.09.2017.
 */

import React, {Component} from 'react';


import Heading from 'grommet/components/Heading';
import Image from 'grommet/components/Image';
import Box from 'grommet/components/Box';
import Animate from 'grommet/components/Animate';
import Button from 'grommet/components/Button';
import Value from 'grommet/components/Value';
import Responsive from 'grommet/utils/Responsive';

import DataStore from '../../stores/DataStore';


import LinkUp from 'grommet/components/icons/base/LinkUp';
import LinkDown from 'grommet/components/icons/base/LinkDown';

import * as DataActions from '../../actions/DataActions';

import Info from 'grommet/components/icons/base/Info';

import Moment from 'moment';

import InformationLayerComponent from "./information-layer.component";

import {Hidden, Container, Row, Col, Visible} from "react-grid-system";

import Chart, {Axis, Marker, HotSpots, Base, Grid, Line, Layers, MarkerLabel} from 'grommet/components/Chart';

export default class CompanyDashboardComponent extends Component {

  constructor(props) {
    super(props);

    this.getCompanyData = this.getCompanyData.bind(this);
    this.getCompanyInformation = this.getCompanyInformation.bind(this);




    this.state = {
      companyName: "",
      companyData: [],
      show: false,
      change: 0,
      volume: 0,
      maxVal: 0,
      minVal: 10000000,
      priceArray: [],
      puffer: 0.25,//Space to the bottom and top of chart
      markerPos: 0,//Position of the Marker
      dateOptions: {
        "day": "2-digit",
        "month": "2-digit",
        "year": "2-digit",
        "hour": "numeric",
        "minute": "numeric"
      }
    }
  }

  componentWillUnmount() {

    DataStore.removeListener('data_changed_' + this.props.company.toUpperCase(), this.getCompanyData);
    DataStore.removeListener('info_changed_' + this.props.company.toUpperCase(), this.getCompanyInformation);


    DataActions.stopCompanyPolling(this.state.interval);
    this.responsive.stop();
  }

  componentDidMount() {
    this.state.interval = DataActions.startCompanyPolling(this.props.company);
    DataActions.fetchCompanyInformation(this.props.company);
  }

  componentWillMount() {
    this.getPriceArray();
    DataStore.on('info_changed_' + this.props.company.toUpperCase(), this.getCompanyInformation);
    DataStore.on('data_changed_' + this.props.company.toUpperCase(), this.getCompanyData);
    DataActions.fetchCompanyData(this.props.company);
  }



  /**
   * Gets CompanyData from DataStore
   */
  getCompanyData() {
    let companyData = DataStore.getCompanyData(this.props.company)
    this.setState({
      companyData ,
      maxVal: 0,
      minVal: 10000000,
      priceArray: []
    }, () => this.getPriceArray());
  }


  getCompanyInformation() {
    this.setState({
      companyInformation: DataStore.getCompanyInformation(this.props.company)
    })
  }

  getPriceArray(nextState) {

    let state = nextState || this.state;

    let items = state.companyData;

    this.state.itemLength = items.length;

    this.setState({items});

    let minVal = this.state.minVal;
    let maxVal = this.state.maxVal;

    let prices = items.map((item) => {

      let price = item.price;
      if (price < minVal) minVal = price;
      if (price > maxVal) maxVal = price;
      return price;
    });
    if (prices !== this.state.priceArray)
      this.setState({priceArray: prices, minVal, maxVal});

    return prices;
  }


  render() {
    let companyInformation = this.state.companyInformation;
    let show = this.state.show;
    let markerPos = this.state.markerPos;
    let max = this.state.companyInformation && this.props.max ? this.props.max[this.state.companyInformation.symbol] : 0;
    let change = 0;
    let volume = 0;


    let priceArray = this.state.priceArray;
    let items = this.state.items;
    let length = priceArray.length;
    let puffer = this.state.puffer;
    let minVal = this.state.minVal;
    let maxVal = this.state.maxVal;
    let options = this.state.dateOptions;

    console.log("RENDER CompanyDashboard");

    try {
      change = (items[markerPos] ? +items[markerPos].change : items[length - 1].change);
      volume = items[markerPos] ? +items[markerPos].volume : items[length - 1].volume;
    } catch (e) {
    }


    return (

      <Box style={{"width": "100%", "height": "100%"}} justify="around" pad={{"vertical": "large"}}>

        <Row >
          <Animate enter={{"animation": "slide-right", "duration": 1000, "delay": 20}}
                   keep={true}
                   visible={"scroll"}
          >
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
            <Col xl={6} sm={7} xs={10} style={{"paddingTop": "2%"}}>
              <Box align="start" style={{"textAlign": "left"}}>
                <Heading tag="h1">
                  {companyInformation ? this.state.companyInformation.companyName : ""}
                </Heading>
                <Heading truncate={true} tag="h2">
                  {companyInformation ? this.state.companyInformation.symbol : ""}

                </Heading>
                <Visible xs>
                  <Button icon={<Info />}
                          label={""}
                          accent={true}
                          onClick={() => this.setState({show: true})}
                  />
                </Visible>
              </Box>
            </Col>
          </Animate>
          <Animate enter={{"animation": "slide-left", "duration": 1000, "delay": 20}}
                   keep={true}
                   visible={"scroll"}
          >
            {/*Information Button */}
            <Col xl={2} sm={1} xs={0} style={{"paddingTop": "2%"}}>
              <Box >
                <Visible xl>
                  <Button icon={<Info />}
                          label={"Information"}
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

          </Animate>
          <Col xl={1} sm={1} xs={1}/>
        </Row>
        <Animate enter={{"animation": "slide-right", "duration": 1000, "delay": 20}}
                 keep={true}
                 visible={"scroll"}
        >
          <Row>
            <Col sm={1} xl={1} xs={1}/>
            {/*Chart*/}
            <Col sm={10} xl={10} xs={10}>
              <Chart style={{"width": "100%"}}>
                <Chart vertical={true} style={{"width": "100%"}}>
                  {/*<MarkerLabel count={length}*/}
                  {/*index={markerPos}*/}
                  {/*label={<Value value={(priceArray[markerPos] || priceArray[length - 1] ) + " $"}/>}/>*/}
                  {/*<MarkerLabel count={length}*/}
                  {/*index={markerPos}*/}
                  {/*label={items[markerPos] ? Moment(items[markerPos].timestamp).format('DD/MM/YYYY h:mm A') : ""}/>*/}

                  <Base style={{"width": "100%"}}/>
                  <Layers>
                    <Line values={priceArray}
                      // smooth={true}
                          max={maxVal + puffer}
                          min={minVal - puffer}
                          style={{"strokeWidth": "10px"}}
                          colorIndex='accent-1'
                          activeIndex={markerPos}/>
                    <Marker colorIndex='graph-2'
                            count={length}
                            vertical={true}
                            index={markerPos}/>
                    <HotSpots count={length}
                              max={100}
                              style={{"backgroundColor": "blue"}}
                              activeIndex={markerPos}
                              onActive={(index) => {
                                this.setState({markerPos: index});
                              }}/>
                  </Layers>


                  <Axis count={2}
                        labels={[{
                          "index": 0,
                          "label": items[0] ? Moment(items[0].timestamp).format('DD/MM/YYYY h:mm A') : ""

                        }
                          , {
                            "index": 1,
                            "label": items[length - 1] ? Moment(items[length - 1].timestamp).format('DD/MM/YYYY h:mm A') : ""
                          }]}/>
                </Chart>
                <Axis count={3}
                      labels={[{"index": 0, "label": (minVal - puffer)}, {
                        "index": 1,
                        "label": items[length / 2] ? items[length / 2].price : ""
                      }, {"index": 2, "label": (maxVal + puffer)}]}
                      vertical={true}/>
              </Chart>
            </Col>
            <Col sm={1} xl={1} xs={1}/>
          </Row>
        </Animate>

        <Row>
          <Animate enter={{"animation": "slide-right", "duration": 1000, "delay": 20}}
                   keep={true}
                   visible={"scroll"}
          >
            <Col sm={3} xl={3} xs={3}>
              <Value size="large"
                     value={+change.toFixed(4)}
                     label='Change'
                     icon={change > 0 ? <LinkUp colorIndex='accent-2' size='large'/> :
                       <LinkDown colorIndex='accent-2' size='large'/>}
                     units='%'
                     colorIndex='accent-2'
                     align='start'
              />
            </Col>
            <Col sm={3} xl={3} xs={3}>
              <Value size="large"
                     value={+volume}
                     label='Volume'
                     colorIndex='accent-2'
                     align='start'
              />
            </Col>
          </Animate>
          <Animate enter={{"animation": "slide-left", "duration": 1000, "delay": 20}}
                   keep={true}
                   visible={"scroll"}
          >
            <Col sm={3} xl={3} xs={3}>
              <Visible xl>
                <Value size="large"
                       value={max.max}
                       units="$"
                       label='Highest Point'
                       colorIndex='accent-2'
                       align='start'
                />
              </Visible>
            </Col>
            <Col sm={3} xl={3} xs={3}>

              <Visible xl>
                <Value size="large"
                       units="$"
                       value={max.min}
                       label='Lowest Point'
                       colorIndex='accent-2'
                       align='start'
                />
              </Visible>
            </Col>
          </Animate>
        </Row>

        {show ? (
          <InformationLayerComponent onClose={() => this.setState({show: false})}
                                     information={companyInformation}
                                     visible={show}
          />
        ) : ""}

      </Box>);

  }
}