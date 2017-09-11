/**
 * Created by boebel on 31.08.2017.
 */
import React, {Component} from 'react';
import DataStore from '../stores/DataStore';

import Split from 'grommet/components/Split';
import AccordionPanel from 'grommet/components/AccordionPanel';
import Accordion from 'grommet/components/Accordion';
import Animate from 'grommet/components/Animate';
import Box from 'grommet/components/Box';
import Title from 'grommet/components/Title';

import SidebarComponent from "./sidebar.component";
import DatabaseBuildInfoComponent from "./database.component/database-buildInfo.component";
import DatabaseLogComponent from "./database.component/database-log.component";
import DatabaseStatsComponent from "./database.component/database-stats.component";

import * as DataAction from "../actions/DataActions";

export default class DatabaseComponent extends Component {

  constructor() {
    super();

    this.getDatabaseData = this.getDatabaseData.bind(this);
    this.getDatabaseLog = this.getDatabaseLog.bind(this);

    this.state = {
        stats: {},
        log: {},
        buildInfo: {}
    };

  }

  componentWillMount() {
    DataStore.on('database_changed', this.getDatabaseData);
    DataStore.on('database_log_changed', this.getDatabaseLog);

    DataAction.fetchDatabaseLog();
    DataAction.startPollingLog();
    DataAction.fetchDatabaseStats();
    DataAction.fetchDatabaseBuildInfo();
  }

  componentWillUnmount() {
    DataStore.removeListener('database_changed', this.getDatabaseData);
    DataStore.removeListener('database_log_changed', this.getDatabaseLog);
    DataAction.stopPollingLog();
  }


  getDatabaseData() {
    let stats=DataStore.getDatabaseData().stats,
         log = DataStore.getDatabaseData().log,
         buildInfo = DataStore.getDatabaseData().buildInfo
    this.setState({
      stats,
      log,
      buildInfo
    });
  }

  getDatabaseLog() {

    this.setState({
      log: DataStore.getDatabaseLog()
    });

  }

  render() {


    return (
      <Split fixed={true}
             flex='right'
             separator={false}>

        <SidebarComponent active={2}/>
        <Box pad ="medium">
          <Title>Database</Title>
          <Accordion active={0}>
            <AccordionPanel heading='Build Information'>
              <Animate enter={{"animation": "slide-down", "duration": 800, "delay": 0}}
                       leave={{"animation": "slide-up", "duration": 1000, "delay": 0}}
                       keep={true}>

                <DatabaseBuildInfoComponent value={this.state.buildInfo}/>
              </Animate>
            </AccordionPanel>
            <AccordionPanel heading='Database Specs'>

              <DatabaseStatsComponent value={this.state.stats}/>
            </AccordionPanel>
            <AccordionPanel heading={'Database Log ('+ this.state.log.totalLinesWritten + " lines)"} >

              <DatabaseLogComponent value={this.state.log}/>
            </AccordionPanel>
          </Accordion>
        </Box>
      </Split>

    );
  }
}