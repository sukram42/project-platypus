/**
 * Created by boebel on 20.10.2017.
 */


import React, {Component} from 'react';


import Button from 'grommet/components/Button';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';

import TestIcon from 'grommet/components/icons/base/Test';
import Deploy from 'grommet/components/icons/base/Deploy';
import Error from 'grommet/components/icons/base/Close';
import Dislike from 'grommet/components/icons/base/Dislike';

import * as DataAction from '../../actions/DataActions';
import DataStore from '../../stores/DataStore';

export default class StartTestComponent extends React.PureComponent {

  constructor(props) {
    super(props);

    this.handler = this.handler.bind(this);
    this.dataChanged = this.dataChanged.bind(this);

    this.state = {
      testStarted: DataStore.isTestStarted() || false,
      error: false
    }
  }

  componentWillMount() {
    DataStore.on('test_started_changed',this.dataChanged);
  }

  componentWillUnmount() {
    DataStore.removeListener('test_started_changed',this.dataChanged);
  }

  dataChanged()
  {
    this.setState({testStarted: DataStore.testStarted()});
  }

  async handler() {

    try {
      let response = await DataAction.startTests();
      if (response && (response.status === 200 || response.status === 304))
        this.setState({testStarted: true});
      else
        this.setState({error: true});

    }catch(err){
      console.error(err);
    }
  }


  render() {

    let started = this.state.testStarted;
    let error = this.state.error;

    let view_button =
      (<Button
        size="large"
        onClick={() => this.handler()}
        type='button'>
        <Box className="startTestBox" pad={{"between": "medium"}}>
          <TestIcon size="huge"/>
          <Heading strong={false}
                   uppercase={true}
                   tag='h1'>Start Test</Heading>
        </Box>
      </Button>);

    let view_started =
      (<Box className="startTestBox" pad={{"between": "medium"}}>
        <Deploy size="huge"/>
        <Heading strong={false}
                 uppercase={true}
                 tag='h1'>
          Test started
        </Heading>
      </Box>);

    let view_error =
      (<Button
        size="large"
        onClick={() => this.handler()}
        type='button'>
        <Box className="startTestBox" pad={{"between": "medium"}}>
          <Dislike size="huge" colorIndex="critical"/>
          <Heading strong={false}
                   uppercase={true}
                   tag='h1'>Something went barely wrong</Heading>
        </Box>
      </Button>);

    return (
      <Box>
        {
          !error ?
            !started ? view_button : view_started
            :
            view_error
        }

      </Box>

    );
  }


}