import React, { Component } from 'react';

import App from 'grommet/components/App';
import Header from 'grommet/components/Header';
import Section from 'grommet/components/Section';
import Hero from 'grommet/components/Hero'
import Image from 'grommet/components/Image'
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Card from 'grommet/components/Card';
import Columns from 'grommet/components/Columns';


export default class BasicApp extends Component {


  render() {
    return (
      <App>
        <Header></Header>
        <Section>
          <Hero background={<Image src='https://ak6.picdn.net/shutterstock/videos/6202598/thumb/1.jpg' fit='cover' full={true} />} backgroundColorIndex='dark'>
            <Box direction='row'
                 justify='center'
                 align='center'>
              <Box basis='1/2'
                   align='end'
                   pad='medium' />
              <Box basis='1/2'
                   align='start'
                   pad='medium'>
                <Box colorIndex='grey-2-a'>
                  <Card heading='Heading'
                        description='Hero description text.'
                        label='label'
                        link={<Anchor href='#'
                                      primary={true}
                                      label='Link' />} />
                </Box>
              </Box>
            </Box>

          </Hero>
        </Section>
        <Section>

          <Columns masonry = {false}>
            <Card label="Sample Webapp2" heading='Sample Heading2' description='Sample Description' thumbnail = 'http://www.somebodymarketing.com/wp-content/uploads/2013/05/Stock-Dock-House.jpg'/>
            <Card label="Sample Webapp2" heading='Sample Heading2' description='Sample Description' thumbnail = 'http://upload.wikimedia.org/wikipedia/commons/thumb/0/05/C_Stock_at_Ladbroke_Grove_1.jpg/1280px-C_Stock_at_Ladbroke_Grove_1.jpg'/>
            <Card label="Sample Webapp2" heading='Sample Heading2' description='Sample Description' thumbnail = 'http://www.sitebuilderreport.com/assets/facebook-stock-up-446fff24fb11820517c520c4a5a4c032.jpg'/>
            <Card label="Sample Webapp2" heading='Sample Heading2' description='Sample Description' thumbnail = 'http://www.somebodymarketing.com/wp-content/uploads/2013/05/Stock-Dock-House.jpg'/>
            <Card label="Sample Webapp2" heading='Sample Heading2' description='Sample Description' thumbnail = 'http://www.somebodymarketing.com/wp-content/uploads/2013/05/Stock-Dock-House.jpg'/>
          </Columns>
        </Section>
      </App>
    );
  }


}
