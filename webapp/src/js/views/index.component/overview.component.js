/**
 * Created by boebel on 25.09.2017.
 */
import React, {Component} from 'react';


import Box from 'grommet/components/Box';
import Paragraph from 'grommet/components/Paragraph';
import Image from 'grommet/components/Image';
import Heading from 'grommet/components/Heading';

import {Row, Col, Container} from "react-grid-system";


export default class OverviewComponent extends Component {

  render() {
    return (
      <Box pad="large">
      <Container fluid={true}>
        <Row style={{"marginBottom":"3%"}}>
          <Col xl={4} style={{"padding":"0 5% 0 5%"}}>
            <Image size="small" src="img/nodejs-new-pantone-black.png"/>
          </Col>
          <Col xl={4} style={{"padding":"0 5% 0 5%"}}>
            <Image size="small" src="img/mesos.png"/>
          </Col>
          <Col xl={4} style={{"padding":"0 5% 0 5%"}}>
            <Image size="small" src="img/apache.png" />
          </Col>
        </Row>
        <Row>
          <Col xl={4} style={{"padding":"0 5% 0 5%"}}>
            <Heading strong={false}
                     uppercase={true}
                     tag='h3'>
              Webserver
            </Heading>
          </Col>

          <Col xl={4} style={{"padding":"0 5% 0 5%"}}>
            <Heading strong={false}
                     uppercase={true}
                     tag='h3'>
              Container Management
            </Heading>
          </Col>
          <Col xl={4} sm={2} xs={2} style={{"padding":"0 5% 0 5%"}}>
            <Heading strong={false}
                     uppercase={true}
                     tag='h3'>
              Traffic Simulation
            </Heading>
          </Col>
          <Col xl={4} sm={2} xs={2} style={{"padding":"0 5% 0 5%"}}/>
        </Row>
        <Row>
          <Col xl={4} style={{"padding":"0 5% 0 5%"}}>
            <Heading strong={false}
                     uppercase={true}
                     tag='h1'>
              NodeJS
            </Heading>
          </Col>
          <Col xl={4} style={{"padding":"0 5% 0 5%"}}>
            <Heading strong={false}
                     uppercase={true}
                     tag='h1'>
              Mesosphere
            </Heading>
          </Col>
          <Col xl={4} style={{"padding":"0 5% 0 5%"}}>
            <Heading strong={false}
                     uppercase={true}
                     tag='h1'>
              JMeter
            </Heading>
          </Col>
        </Row>
        <Row>
          <Col xl={4} style={{"padding":"0 5% 0 5%"}}>
            <Paragraph size='medium'>od tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At
              vero eos et accusam et jus</Paragraph>
          </Col>
          <Col xl={4} style={{"padding":"0 5% 0 5%"}}>
              <Paragraph size='medium'>od tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At
                vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus
                est Lorem ipsum dolor</Paragraph>
          </Col>
          <Col xl={4} style={{"padding":"0 5% 0 5%"}}>

              <Paragraph size='medium'>od tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At
                vero eos et accusam et justo duo </Paragraph>
          </Col>
          <Col xl={4} style={{"padding":"0 5% 0 5%"}}/>
        </Row>
      </Container>
      </Box>
    );
  }


}
