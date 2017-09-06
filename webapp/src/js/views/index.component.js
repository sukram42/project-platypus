import React, {Component} from 'react';

import Article from 'grommet/components/Article';
import Header from 'grommet/components/Header';
import Section from 'grommet/components/Section';
import Anchor from 'grommet/components/Anchor';
import Card from 'grommet/components/Card';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Image from 'grommet/components/Image';
import Box from 'grommet/components/Box';
import Spinning from 'grommet/components/icons/Spinning';

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
        <Header fixed={true} size="small">
          <Box pad="small" flex={true}
               direction='row'>
            <Image src="/img/hpe_logo.png" size="small" full="vertical"/>
          </Box>

        </Header>
        <Section>
          <HeaderHero image="/img/train.jpg"
                      linkHref="/home"
                      linkLabel="See the numbers"
                      description="Sample Description"
                      label="Sample Label"
                      heading="Sample Heading"
          />
        </Section>
        <Section>
          <Tiles flush={false}
                 fill={false}>
            {this.state.values?this.state.values.map((item, index) =>
              <Tile key={index}>
                <Card key={index}
                      label={item ? item.industry : ""}
                      heading={item ? item.companyName : ""}
                      description={item ? item.description : ""}
                      thumbnail='http://www.somebodymarketing.com/wp-content/uploads/2013/05/Stock-Dock-House.jpg'
                      link={
                        <Anchor path={{path: '/app', index: true}} primary={true} label='View Numbers'/>
                      }/>
              </Tile>):<Spinning/>}
          </Tiles>
        </Section>
      </Article>
    );
  }


}
