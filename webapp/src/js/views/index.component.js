import React, {Component} from 'react';

import Article from 'grommet/components/Article';
import Header from 'grommet/components/Header';
import Section from 'grommet/components/Section';
import Anchor from 'grommet/components/Anchor';
import Card from 'grommet/components/Card';
import Columns from 'grommet/components/Columns';
import Image from 'grommet/components/Image';
import Box from 'grommet/components/Box';

import DataStore from '../stores/DataStore';

import * as DataActions from '../actions/DataActions';

import HeaderHero from "./header-hero.component";

export default class IndexCompany extends Component {

  constructor() {
    super();

    this.state = {
      values: this.getData()
    }
  }

  componentWillMount() {



    DataStore.on('change', () => {
      this.setState({
        values: this.getData()
      });
      console.dir(this.state);
    });
  }

  componentWillUnmount() {
    DataStore.removeListener('change', this.getData());
  }

  getData() {
    return DataStore.getInformation();
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
          <Columns masonry={false}>
            {this.state.values.map((item, index) =>
              <Card key={index}
                    label={item ? item.industry : ""}
                    heading={item ? item.companyName : ""}
                    description={item ? item.description : ""}
                    thumbnail='http://www.somebodymarketing.com/wp-content/uploads/2013/05/Stock-Dock-House.jpg'
                    link={
                      <Anchor path={{ path: '/app', index: true }} primary={true} label='View Numbers'/>
                    }/>)}
          </Columns>
        </Section>
      </Article>
    );
  }


}
