/**
 * Created by boebel on 06.09.2017.
 */

/**
 * Created by boebel on 06.09.2017.
 */
/**
 * Created by boebel on 06.09.2017.
 */
import React, {Component} from 'react';

import Chart, {Axis, Marker, HotSpots, Base, Grid, Line, Layers, MarkerLabel} from 'grommet/components/Chart';

import Meter from 'grommet/components/Meter';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Value from 'grommet/components/Value';
import Label from 'grommet/components/Value';
import Box from 'grommet/components/Box';
import Title from 'grommet/components/Title';

import Timestamp from 'grommet/components/Timestamp';


export default class PriceChartComponent extends Component {

  constructor() {
    super();

    this.state = {
      maxVal: 0,
      minVal: 10000000,
      priceArray: [],
      puffer: 0.25,//Space to the bottom and top of chart
      markerPos: 0,//Position of the Marker
      elementCount: 150 //Count of points in Diagramm
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
    let elementCount = this.state.elementCount;

    //Filter Elements
    items = items.filter(function (value, index, Arr) {
      return index % Math.ceil(items.length / elementCount) == 0;
    });

    this.setState({items});

    let minVal = this.state.minVal;
    let maxVal = this.state.maxVal;


    let prices = items.map((item) => {

      let price = item.price;
      if (price < minVal) minVal = price;
      if (price > maxVal) maxVal = price;
      return price;
    });
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
    let change = 1;
    try {
      change = (items[markerPos] ? +items[markerPos].change : items[length - 1].change) + 1;
    } catch (e) {
    }

    return (
      <Tiles fill={true} flush={false}>
        <Tile>
          <Chart>
            <Axis count={3}
                  labels={[{"index": 0, "label": (minVal - puffer)}, {
                    "index": 1,
                    "label": items[length / 2] ? items[length / 2].price : ""
                  }, {"index": 2, "label": (maxVal + puffer)}]}
                  vertical={true}/>
            <Chart vertical={true}>
              <MarkerLabel count={length}
                           index={markerPos}
                           label={<Value value={(priceArray[markerPos] || priceArray[length - 1] ) + " $"}/>}/>
              <MarkerLabel count={length}
                           index={markerPos}
                           label={items[markerPos] ? <Timestamp align="center" fields={['date', 'time', 'seconds']}
                                                                value={new Date(items[markerPos].timestamp)}/> : ""}/>
              <Base height='large'
                    width='large'/>
              <Layers>
                <Grid rows={5}
                      columns={3}/>
                <Line values={priceArray}
                      max={maxVal + puffer}
                      min={minVal - puffer}
                      colorIndex='accent-1'
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
                      "label": items[0] ? <Timestamp align="center" value={new Date(items[0].timestamp)}/> : ""
                    }
                      , {
                        "index": 1,
                        "label": items[length - 1] ?
                          <Timestamp align="center" value={new Date(items[length - 1].timestamp)}/> : ""
                      }]}/>
            </Chart>
          </Chart>
        </Tile>


        <Tile>

          <Box responsive={false}
               align='center'>
            <Title>Change</Title>
            <Meter type='arc'
                   size='small'
                   vertical={false}
                   value={+change}
                   max={2}
                   min={0}/>
            <Box direction='row'
                 justify='between'
                 align='center'
                 pad={{"between": "small"}}
                 responsive={false}>
              <Label size='small'>
                -100%
              </Label>
              <Value value={(((change - 1) * 100).toFixed(0))}
                     units='%'
                     size='small'/>
              <Label size='small'>
                100%
              </Label>
            </Box>
          </Box>
        </Tile>
      </Tiles>

    );
  }
}
