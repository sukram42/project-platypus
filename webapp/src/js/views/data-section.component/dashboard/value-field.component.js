/**
 * Created by boebel on 10.10.2017.
 */


import React, {Component} from 'react';


import Value from 'grommet/components/Value';
import Headline from 'grommet/components/Headline';
import Heading from 'grommet/components/Heading';

import DataStore from '../../../stores/DataStore';

import LazyLoad from 'react-lazyload';


export default class ValueFieldComponent extends React.PureComponent {

  constructor(props) {
    super(props);


    this.handler = this.handler.bind(this);

    let listener = this.props.listener;

    this.state = {
      value: DataStore.getValue(listener, props.symbol)
    };

    if (listener)
      DataStore.on(listener + ":" + props.symbol, this.handler);
  }


  componentWillUnmount() {
    let listener = this.props.listener;
    if (listener)
      DataStore.removeListener(listener + ":" + this.props.symbol, this.handler);
  }


  handler() {
    let value = DataStore.getValue(this.props.listener, this.props.symbol);
    if (this.state.value !== value)
      this.setState({value});
  }


  render() {

    let size = this.props.size || 'medium';
    let value = this.state.value || this.props.value;
    let colorIndex = this.props.colorIndex || '';
    let aligned = this.props.aligned || 'center';
    let units = this.props.units || "";
    let label = this.props.label || "";
    let trend = this.props.trend || false;


    return (
      <Heading size={size}
                tag="h1"
             style={{"width": "100%"}}
             label={label}
             // colorIndex={colorIndex}
             align={aligned}
        // icon= value > 0 ? <LinkUp colorIndex='accent-2' size='large'/> :<LinkDown colorIndex='accent-2' size='large'/>
      >{value + " " + units}</Heading>


    );
  }


}