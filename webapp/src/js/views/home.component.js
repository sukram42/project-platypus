/**
 * Created by boebel on 31.08.2017.
 */
import React, {Component} from 'react';
import DataStore from '../stores/DataStore';

import Split from 'grommet/components/Split';
import Box from 'grommet/components/Box';

import SidebarComponent from "./sidebar.component";

export default class HomeComponent extends Component {

  constructor() {
    super();

    this.getData = this.getData.bind(this);
    this.getData();
  }

  componentWillMount() {

    DataStore.on('change', this.getData);
    console.log("count",DataStore.listenerCount('change'));
  }

  componentWillUnmount() {
    DataStore.removeListener('change', this.getData);
  }

  getData() {
    this.setState({
      values: DataStore.getInformation()
    });
  }


  render() {
    return (
        <Split fixed={true}
               flex='right'
               separator={false}>

          <SidebarComponent active={0}/>
          <Box></Box>
        </Split>

    );
  }
}