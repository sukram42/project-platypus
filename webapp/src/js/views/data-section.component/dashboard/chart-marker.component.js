/**
 * Created by boebel on 10.10.2017.
 */


import React from 'react';

import DataStore from '../../../stores/DataStore';
import {Marker} from "grommet/components/chart/Chart";

export default class ChartMarkerComponent extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state= {};
    this.handler = this.handler.bind(this);

    let listener =  this.props.listener;

    if(listener)
      DataStore.on(listener +":" + props.symbol, this.handler);
  }


  componentWillUnmount() {
    let listener =  this.props.listener;
    if(listener)
      DataStore.removeListener(listener +":" + this.props.symbol,this.handler);
  }


  handler(){
    let value = DataStore.getValue(this.props.listener, this.props.symbol);
    this.setState({value});
  }


  render() {
    let value = this.state.value || this.props.value;

    return (
            <Marker colorIndex='graph-2'
                    count={length}
                    vertical={true}
                    index ={+value}/>

    );
  }


}


