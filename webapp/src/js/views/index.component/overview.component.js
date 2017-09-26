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

import Texts from '../../texts';

import {Row, Col, Container, Visible, Hidden} from "react-grid-system";


export default class OverviewComponent extends Component {

  render() {

    let texts = Texts.overview;

    return (

      <Box pad="large">
        <Visible xl>
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
              <Col xl={4} style={{"padding": "0 5% 0 5%"}}>
                <Heading strong={false}
                         uppercase={true}
                         tag='h1'>
                  {texts.node.title}
                </Heading>
              </Col>
              <Col xl={4} style={{"padding": "0 5% 0 5%"}}>
                <Heading strong={false}
                         uppercase={true}
                         tag='h1'>
                  {texts.mesosphere.title}
                </Heading>
              </Col>
              <Col xl={4} style={{"padding": "0 5% 0 5%"}}>
                <Heading strong={false}
                         uppercase={true}
                         tag='h1'>
                  {texts.jMeter.title}
                </Heading>
              </Col>
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
              <Col xl={4} style={{"padding": "0 5% 0 5%"}}/>
            </Row>
          </Container>
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
