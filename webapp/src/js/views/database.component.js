/**
 * Created by boebel on 31.08.2017.
 */
import React, {Component} from 'react';
import DataStore from '../stores/DataStore';

import Split from 'grommet/components/Split';
import Box from 'grommet/components/Box';
import SidebarComponent from "./sidebar.component";

export default class DatabaseComponent extends Component {

  constructor() {
    super();

    this.getInformation = this.getInformation.bind(this);
    this.state = {
      information: DataStore.getInformation(),
      data : DataStore.getData()
    };
  }

  componentWillMount() {
    DataStore.on('info_changed', this.getInformation);
    DataStore.on('data_changed', this.getData);

  }

  componentWillUnmount() {
    DataStore.removeListener('info_change', this.getInformation);
    DataStore.removeListener('data_change', this.getData);
  }

  getInformation() {
    this.setState({
      values: DataStore.getInformation()
    });
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

          <SidebarComponent active={2}/>
          <Box></Box>
        </Split>

    );
  }
}