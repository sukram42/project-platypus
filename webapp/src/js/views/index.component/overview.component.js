/**
 * Created by boebel on 25.09.2017.
 */
import React, {Component} from 'react';


import Box from 'grommet/components/Box';
import Paragraph from 'grommet/components/Paragraph';
import Image from 'grommet/components/Image';
import Heading from 'grommet/components/Heading';
import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';
import Animate from 'grommet/components/Animate';

import Texts from '../../texts';

import {Row, Col, Container, Visible, Hidden} from "react-grid-system";


export default class OverviewComponent extends React.PureComponent {

  shouldComponentUpdate(){
    return false;
  }
  componentDidMount(){
    console.log("mount");
  }

  render() {

    let texts = Texts.overview;

    console.log("Render Overview")

    return (

      <Box pad="large">
        <Visible xl>
          <Animate enter={{"animation": "fade", "duration": 1500, "delay": 0}}
                   leave={{"animation": "fade", "duration": 1500, "delay": 0}}
                   visible={"scroll"} keep={true}>
          <Container fluid={true}>

            <Row style={{"marginBottom": "3%"}}>

                <Col xl={4} style={{"padding": "0 5% 0 5%"}}>
                  <Image size="small" src={texts.node.picture}/>
                </Col>


                <Col xl={4} style={{"padding": "0 5% 0 5%"}}>
                  <Image size="small" src={texts.mesosphere.picture}/>
                </Col>
                <Col xl={4} style={{"padding": "0 5% 0 5%"}}>
                  <Image size="small" src={texts.jMeter.picture}/>
                </Col>

            </Row>
            <Row>
                <Col xl={4} style={{"padding": "0 5% 0 5%"}}>
                  <Heading strong={false}
                           uppercase={true}
                           tag='h3'>
                    {texts.node.caption}
                  </Heading>
                </Col>
                  <Col xl={4} style={{"padding": "0 5% 0 5%"}}>
                    <Heading strong={false}
                             uppercase={true}
                             tag='h3'>
                      {texts.mesosphere.caption}
                    </Heading>
                  </Col>
                  <Col xl={4} sm={2} xs={2} style={{"padding": "0 5% 0 5%"}}>
                    <Heading strong={false}
                             uppercase={true}
                             tag='h3'>
                      {texts.jMeter.caption}
                    </Heading>
                  </Col>
                  <Col xl={4} sm={2} xs={2} style={{"padding": "0 5% 0 5%"}}/>
            </Row>

            <Row>

              <Animate enter={{"animation": "fade", "duration": 1000, "delay": 0}}
                       leave={{"animation": "fade", "duration": 1000, "delay": 0}}
                       visible={"scroll"} keep={true}>
                <Col xl={4} style={{"padding": "0 5% 0 5%"}}>
                  <Heading strong={false}
                           uppercase={true}
                           tag='h1'>
                    {texts.node.title}
                  </Heading>
                </Col>
              </Animate>
              <Animate enter={{"animation": "fade", "duration": 1000, "delay": 0}}
                       leave={{"animation": "fade", "duration": 1000, "delay": 0}}
                       visible={"scroll"} keep={true}>
                <Col xl={4} style={{"padding": "0 5% 0 5%"}}>
                  <Heading strong={false}
                           uppercase={true}
                           tag='h1'>
                    {texts.mesosphere.title}
                  </Heading>
                </Col>
              </Animate>
              <Animate enter={{"animation": "fade", "duration": 1000, "delay": 0}}
                       leave={{"animation": "fade", "duration": 1000, "delay": 0}}
                       visible={"scroll"} keep={true}>

                <Col xl={4} style={{"padding": "0 5% 0 5%"}}>
                  <Heading strong={false}
                           uppercase={true}
                           tag='h1'>
                    {texts.jMeter.title}
                  </Heading>
                </Col>
              </Animate>
            </Row>
            <Row>
                <Col xl={4} style={{"padding": "0 5% 0 5%"}}>
                  <Paragraph size='medium'>{texts.node.description}</Paragraph>
                </Col>
                <Col xl={4} style={{"padding": "0 5% 0 5%"}}>
                  <Paragraph size='medium'>{texts.mesosphere.description}
                  </Paragraph>
                </Col>
                <Col xl={4} style={{"padding": "0 5% 0 5%"}}>

                  <Paragraph size='medium'>{texts.jMeter.description} </Paragraph>
                </Col>
            </Row>
          </Container>
      </Animate>
        </Visible>
        <Hidden xl>
          <Table responsive={true}>
            <tbody>
            <TableRow>
              <td>
                <Image size="small" src={texts.node.picture}/>
              </td>
              <td>
                <Heading strong={false}
                         uppercase={true}
                         tag='h3'>
                  {texts.node.caption}
                </Heading>
                <Heading strong={false}
                         uppercase={true}
                         tag='h1'>
                  {texts.jMeter.title}
                </Heading>
              </td>
              <Hidden xs>
                <td>

                  {texts.node.description}
                </td>
              </Hidden>
            </TableRow>
            <TableRow>
              <td>
                <Image size="small" src={texts.mesosphere.picture}/>
              </td>
              <td>
                <Heading strong={false}
                         uppercase={true}
                         tag='h3'>
                  {texts.mesosphere.caption}
                </Heading>
                <Heading strong={false}
                         uppercase={true}
                         tag='h1'>
                  {texts.mesosphere.title}
                </Heading>
              </td>
              <Hidden xs>
                <td>
                  {texts.mesosphere.description}
                </td>
              </Hidden>
            </TableRow>
            <TableRow>
              <td>
                <Image size="small" src={texts.jMeter.picture}/>
              </td>
              <td>
                <Heading strong={false}
                         uppercase={true}
                         tag='h3'>
                  {texts.jMeter.caption}
                </Heading>
                <Heading strong={false}
                         uppercase={true}
                         tag='h1'>
                  {texts.jMeter.title}
                </Heading>
              </td>
              <Hidden xs>
                <td>
                  {texts.jMeter.description}
                </td>
              </Hidden>
            </TableRow>
            </tbody>
          </Table>
        </Hidden>
      </Box>
  );
  }


  }
