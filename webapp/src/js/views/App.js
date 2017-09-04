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

import DataStore from '../stores/DataStore';

import * as DataActions from '../actions/DataActions';

import Home from './Home';

export default class BasicApp extends Component {

  constructor(){
    super();

    this.state = {
      values: this.getData()
    }
  }

  componentWillMount(){

    DataActions.fetchCompanyData('AAPL');
    DataActions.fetchCompanyData('HPE');
    DataActions.fetchCompanyData('IBM');

    DataStore.on('change',()=>{
      this.setState({
        values: this.getData()
      });
      console.dir(this.state);
    });
  }
  componentWillUnmount(){
    DataStore.removeListener('change',this.getData());
  }

  getData(){
    return DataStore.getAll();
  }




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
                        link={<Anchor href='/app'
                                      primary={true}
                                      label='Link' />} />
                </Box>
              </Box>
            </Box>

          </Hero>
        </Section>
        <Section>
          <Columns masonry = {false}>
            {this.state.values.map((item,index)=>
              <Card key={index}
                    label={item?item.industry:""}
                    heading={item?item.companyName:""}
                    description={item?item.description:""}
                    thumbnail = 'http://www.somebodymarketing.com/wp-content/uploads/2013/05/Stock-Dock-House.jpg'
                    link ={
                      <Anchor href='/app' primary={true} label='View Numbers' />
                    }/>)}
          </Columns>
        </Section>
        <Home name="Markus"/>
      </App>
    );
  }


}
