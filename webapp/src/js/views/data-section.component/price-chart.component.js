/**
 * Created by boebel on 06.09.2017.
 */

import React, {Component} from 'react';

import Chart, {Axis, Marker, HotSpots, Base, Grid, Line, Layers, MarkerLabel} from 'grommet/components/Chart';


import Timestamp from 'grommet/components/Timestamp';
import Value from 'grommet/components/Value';
import Box from 'grommet/components/Box';

import Moment from 'moment';

import LinkUp from 'grommet/components/icons/base/LinkUp';
import LinkDown from 'grommet/components/icons/base/LinkDown';

import LineChart from 'grommet/components/icons/base/LineChart';
import Duplicate from 'grommet/components/icons/base/Duplicate';
import LinkTop from 'grommet/components/icons/base/LinkTop';
import LinkBottom from 'grommet/components/icons/base/LinkBottom';

import {Row, Visible, Col, Hidden} from "react-grid-system";

export default class PriceChartComponent extends Component {

  constructor() {
    super();

    this.state = {
      maxVal: 0,
      minVal: 10000000,
      priceArray: [],
      puffer: 0.25,//Space to the bottom and top of chart
      markerPos: 0,//Position of the Marker
      dateOptions:{
        "day":"2-digit",
        "month":"2-digit",
        "year":"2-digit",
        "hour":"numeric",
        "minute":"numeric"
      }
    }

  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      maxVal: 0,
      minVal: 10000000,
      priceArray: []
    }, () => this.getPriceArray(nextProps));
  }

  componentWillMount() {
    this.getPriceArray();
  }

  getPriceArray(nextProps) {

    let props = nextProps || this.props;

    let items = props.values;

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
      this.setState({priceArray: prices, minVal, maxVal})

    return prices;
  }


  render() {

    let markerPos = this.state.markerPos;
    let priceArray = this.state.priceArray;
    let items = this.state.items;
    let length = priceArray.length;
    let puffer = this.state.puffer;
    let minVal = this.state.minVal;
    let maxVal = this.state.maxVal;
    let volume = 0;
    let max = this.props.max;
    let change= 0;
    let options = this.state.dateOptions;

    try {
      change = (items[markerPos] ? +items[markerPos].change : items[length - 1].change) ;
      volume = items[markerPos] ? +items[markerPos].volume : items[length - 1].volume;
    } catch (e) {
    }



    return (
      <Row>
        <Col sm={1} xl={1} xs={1}/>
        <Col sm={6} xl={6} xs={10}
        >
          <Chart style={{"width": "100%"}}>
            <Chart vertical={true} style={{"width": "100%"}}
            >


              <MarkerLabel count={length}
                           index={markerPos}
                           label={<Value value={(priceArray[markerPos] || priceArray[length - 1] ) + " $"}/>}/>
              <MarkerLabel count={length}
                           index={markerPos}
                           label={items[markerPos] ? Moment(items[markerPos].timestamp).format('DD/MM/YYYY h:mm A') : ""}/>

              <Base style={{"width": "100%"}}/>
              <Layers>
                <Grid rows={7}
                      columns={5}/>
                <Line values={priceArray}
                      smooth={true}
                      max={maxVal + puffer}
                      min={minVal - puffer}
                      colorIndex='accent-2'
                      activeIndex={markerPos}/>
                <Marker colorIndex='graph-2'
                        count={length}
                        vertical={true}
                        index={markerPos}/>
                <HotSpots count={length}
                          max={100}
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
        <Col sm={3} xl={3} xs={0}>
          <Hidden xs>
            <Box pad={{"between": "large"}}>
              <Hidden xs>
                <Value size="large"
                       value={+change.toFixed(4)}
                       label='Change'
                       icon={change > 0 ? <LinkUp colorIndex='accent-2' size='large'/> :
                         <LinkDown colorIndex='accent-2' size='large'/>}
                       units='%'
                       colorIndex='accent-2'
                       align='start'
                />
              </Hidden>
              <Hidden xs>
                <Value size="large"
                       value={+volume}
                       label='Volume'
                       colorIndex='accent-2'
                       align='start'

                />
              </Hidden>
              <Visible xl>
                <Value size="large"
                       value={max.max}
                       units="$"
                       label='Highest Point'
                       colorIndex='accent-2'
                       align='start'

                />
              </Visible>
              <Visible xl>
                <Value size="large"
                       units="$"
                       value={max.min}
                       label='Lowest Point'
                       colorIndex='accent-2'
                       align='start'
                />
              </Visible>

            </Box>
          </Hidden>
        </Col>
        <Col sm={1} xl={1} xs={0}/>
      </Row>
    );
  }
}
