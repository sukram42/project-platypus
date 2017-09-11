import React, {Component} from 'react';

import Article from 'grommet/components/Article';
import Header from 'grommet/components/Header';
import Section from 'grommet/components/Section';
import Card from 'grommet/components/Card';
import Search from 'grommet/components/Search';
import Menu from 'grommet/components/Menu';
import Title from 'grommet/components/Title';
import Anchor from 'grommet/components/Anchor';


import Headline from 'grommet/components/Headline';
import Box from 'grommet/components/Box';

import DataStore from '../stores/DataStore';

import * as DataActions from '../actions/DataActions';

import HeaderHero from "./header-hero.component";

export default class IndexCompany extends Component {

  constructor() {
    super();

    DataActions.fetchData();

    this.getData = this.getData.bind(this);
    this.state = {
      data: DataStore.getData()
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
      <Article scrollStep={true}>

        <Section pad='large'
                 justify='center'
                 full='vertical'
                 texture="img/big-ben.jpg"
        >
          <Box direction='row'>
            <Box basis='1/4'
                 align='start'
                 pad='medium'>
            </Box>
            <Box colorIndex='grey-2-a' alignContent="start">
              <Card heading='Heading'
                    description='Hero description text.'
                    label='label'
                    link={<Anchor href='#'
                                  primary={true}
                                  label='Link'/>}/>
            </Box>



          </Box>
        </Section>

        <Section pad='large'
                 justify='center'
                 align='center'
                 full='vertical'
                 colorIndex='grey-4'>
          <Headline margin='none'>
            Section 2
          </Headline>
        </Section>
        <Section pad='large'
                 justify='center'
                 align='center'
                 full='vertical'>
          <Headline margin='none'>
            Section 3
          </Headline>
        </Section>
        <Section pad='large'
                 justify='center'
                 align='center'
                 full='vertical'
                 colorIndex='grey-4'>
          <Headline margin='none'>
            Section 4
          </Headline>
        </Section>
        <Section pad='large'
                 justify='center'
                 align='center'
                 full='vertical'>
          <Headline margin='none'>
            Section 5
          </Headline>
        </Section>
      </Article>
    );
  }


}
