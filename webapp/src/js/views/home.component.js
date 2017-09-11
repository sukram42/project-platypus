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
import Spinning from 'grommet/components/icons/Spinning';
import Anchor from 'grommet/components/Anchor';
import Image from 'grommet/components/Image';


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


          {this.state.values?this.state.values.map((item, index) =>
            <Tile key={index}>
              <Card key={index}
                    label={item ? item.industry : ""}
                    heading={item ? item.companyName : ""}
                    description={item ? item.description : ""}
                    thumbnail={<Image src={'https://storage.googleapis.com/iex/api/logos/' + item.symbol + '.png' } size = "small"/>}
                    link={
                      <Anchor path={{path: ('/companies/' + index), index: true}} primary={true} label='View Numbers'/>
                    }/>
            </Tile>):<Spinning/>}

        </Tiles>
      </Split>

    );
  }
}