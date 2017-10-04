/**
 * Created by boebel on 29.09.2017.
 */

/**
 * Created by boebel on 14.09.2017.
 */
import React, {Component} from 'react';


import Card from 'grommet/components/Card';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Slider from 'nw-react-slider';

import Value from 'grommet/components/Value';

import {Hidden, Row, Col, Visible} from "react-grid-system";

export default class RequestSectionComponent extends Component {

  constructor() {
    super();

    this.state = {
      requests: 0
    }
  }

  handleChange(event) {
    this.setState({requests: event.target.value});

  }

  render() {
    return (
      <Box alignSelf="stretch" colorIndex="grey-1">
      <Row>
        <Col xl={3}>
          <Box direction="column" colorIndex="accent-1"
               pad={{"between": "small", "vertical": "medium", "horizontal": "medium"}}>
            <Box >
              <Value
                value={this.state.requests}
                label='Requests Per Minute'/>
            </Box>
            <Box align="center">
              <input type="range" min={1} max={20} id="f-range" orient="vertical" name="range"
                     onChange={(event) => this.handleChange(event)}/>

            </Box>
          </Box>
        </Col>
        <Col xl={9}>

        </Col>
      </Row>
      </Box>
    );
  }


}
