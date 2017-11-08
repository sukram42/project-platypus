/**
 * Created by boebel on 10.10.2017.
 */
/**
 * Created by boebel on 10.10.2017.
 */


import React from 'react';


import * as DataActions from '../../../actions/DataActions';
import Moment from 'moment';
import Numeral from 'numeral';
import Chart, {Axis, HotSpots, Base, Line, Layers, MarkerLabel} from 'grommet/components/Chart';
import ChartMarkerComponent from "./chart-marker.component";

export default class PriceChartComponent extends React.PureComponent {


  constructor(props) {
    super(props);


    this.state = {
      timestampFormat: 'Do MMM YY h:mm A',
      timestampFormatChart: 'Do MMM YY',
      show: false,
      volume: 0,
      maxVal: 0,
      minVal: 10000000,
      markerPos: 0,
      priceArray: [],
      puffer: 0.25,//Space to the bottom and top of chart
      markerPos: 0,//Position of the Marker
    }


  }

  async componentWillMount() {
    let priceArray = await this.getPriceArray();
    let length = priceArray.length;
    let items = this.state.items;
    let time = items[length - 1].timestamp;

    let symbol = this.props.symbol;
    setTimeout(() => {
      DataActions.sendValue('TIMESTAMP', symbol, Moment(time).format(this.state.timestampFormat));
    }, 0);
  }

  componentWillReceiveProps(nextProps) {
    this.getPriceArray(nextProps);
  }


  getPriceArray(nextProps) {
    return new Promise((res, rej) => {
      let props = nextProps || this.props;
      let items = props.companyData;

      let minVal = 100000;
      let maxVal = 0;


      this.state.itemLength = items.length;

      let prices = items.map((item) => {
        let price = item.price;
        if (price < minVal) minVal = price;
        if (price > maxVal) maxVal = price;
        return price;
      });

      if (prices !== this.state.priceArray)
        this.setState({priceArray: prices, minVal, maxVal, items});
      res(prices);
    });
  }

  render() {

    let symbol = this.props.symbol;

    let markerPos = this.state.markerPos;


    let priceArray = this.state.priceArray;
    let items = this.state.items;
    let length = priceArray.length;
    let puffer = this.state.puffer;
    let minVal = this.state.minVal;
    let maxVal = this.state.maxVal;

    let change = items[length - 1].change;
    let volume = items[length - 1].volume;
    let time = items[length - 1].timestamp;

    let price = items[length - 1].price;


    try {
      change = (items[markerPos] ? +items[markerPos].change : items[length - 1].change);
      volume = items[markerPos] ? +items[markerPos].volume : items[length - 1].volume;
      price = items[markerPos] ? +items[markerPos].price : items[length - 1].price;
      time = items[index] ? +items[index].timestamp : items[length - 1].timestamp;

    } catch (e) {
    }


    setTimeout(function () { // Run after dispatcher has finished
      DataActions.sendValue('CHANGE', symbol,Numeral(+change*100).format('00.00'));
    }, 0);
    setTimeout(function () { // Run after dispatcher has finished
      DataActions.sendValue('PRICE', symbol,  Numeral(price).format('00.00'));
    }, 0);
    setTimeout(function () { // Run after dispatcher has finished
      DataActions.sendValue('VOLUME', symbol, volume);
    }, 0);


    return (

      <Chart style={{"width": "100%"}}>
        <Chart vertical={true} style={{"width": "100%"}}>
          <Base style={{"width": "100%"}}/>
          <Layers>
            <Line values={priceArray}
              // smooth={true}
                  activeIndex={markerPos}
                  points={true}
                  max={maxVal + puffer}
                  min={minVal - puffer}
                  style={{"strokeWidth": "10px"}}
                  colorIndex='accent-3'
            />
            <ChartMarkerComponent symbol={symbol} listener='MARKER_POS'/>
            <HotSpots count={length}
                      max={100}
                      style={{"backgroundColor": "blue"}}
                      onActive={(index) => {
                        volume = items[index] ? +items[index].volume : items[length - 1].volume;
                        change = (items[index] ? +items[index].change : items[length - 1].change);
                        price = (items[index] ? +items[index].price : items[length - 1].price);

                        time = items[index] ? items[index].timestamp : items[length - 1].timestamp;
                        time = Moment(time).format(this.state.timestampFormat);

                        this.setState({markerPos: index});

                        DataActions.sendValue('TIMESTAMP', symbol, time);
                        DataActions.sendValue('VOLUME', symbol, volume);
                        DataActions.sendValue('CHANGE', symbol,Numeral(+change*100).format('00.00'));
                        DataActions.sendValue('MARKER_POS', symbol, index);
                        DataActions.sendValue('PRICE', symbol,  Numeral(price).format('00.00'));
                      }}/>
          </Layers>


          <Axis count={2}
                labels={[{
                  "index": 0,
                  "label": items[0] ? Moment(items[0].timestamp).format(this.state.timestampFormatChart) : ""

                }
                  , {
                    "index": 1,
                    "label": items[length - 1] ? Moment(items[length - 1].timestamp).format(this.state.timestampFormatChart) : ""
                  }]}/>
        </Chart>
        <Axis count={2}
              labels={
                [
                  {"index": 0, "label": Math.floor(minVal - puffer) + " $"},
                  {"index": 1, "label": Math.ceil(maxVal + puffer) + " $"}]}
              vertical={true}/>
      </Chart>

    );
  }


}


