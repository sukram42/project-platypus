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

          <SidebarComponent active={2}/>
          <Box></Box>
        </Split>

    );
  }
}