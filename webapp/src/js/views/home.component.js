/**
 * Created by boebel on 31.08.2017.
 */
import React, {Component} from 'react';
import DataStore from '../stores/DataStore';

import * as DataActions from '../actions/DataActions';

import Split from 'grommet/components/Split';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Card from 'grommet/components/Card';

import SidebarComponent from "./sidebar.component";

export default class HomeComponent extends Component {

  constructor() {
    super();

    DataActions.fetchData();

    this.getData = this.getData.bind(this);
    this.state = {
      data : DataStore.getData()
    };
  }

  componentWillMount() {
    DataStore.on('data_changed', this.getData);

  }

  componentWillUnmount() {
    DataStore.removeListener('data_changed', this.getData);
  }


  getData() {
    this.setState({
      values: DataStore.getData()
    });
  }



  render() {
    return (
      <Split fixed={true}
             flex='right'
             separator={false}>

        <SidebarComponent />

        <Tiles flush={false}
               fill={false}>
          {this.state.data?this.state.data.map((item,index)=>
            <Tile key ={index}>
              <Card key ={index} thumbnail={'https://storage.googleapis.com/iex/api/logos/' + item.symbol + '.png' }
                    heading='Hallo'
                    label={item.symbol}
                    description='Sample description providing more details.' />
            </Tile> ):<Spinning size="large"/> }
        </Tiles>
      </Split>

    );
  }
}