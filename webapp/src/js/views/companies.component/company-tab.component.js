import React, {Component} from 'react';

import Accordion from 'grommet/components/Accordion';
import AccordionPanel from 'grommet/components/AccordionPanel';
import Paragraph from 'grommet/components/Paragraph';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Title from 'grommet/components/Title';
import Image from 'grommet/components/Image';
import Animate from 'grommet/components/Animate';

import CompanyInformationTabComponent from './company-information-tab.component';
import CompanyRawDataTabComponent from './company-rawdata-tab.component';
import CompanyChartsTabComponent from './company-charts-tab.component';

export default class CompanyTabComponent extends Component {

  render() {
    return (
      <Box pad='medium'
           margin='small'>
        <Title responsive={true} tag="h1">
          <Image size="thumb"
                 src={'https://storage.googleapis.com/iex/api/logos/' + this.props.item.symbol + '.png'}/>
          {this.props.item.companyName + " (" + this.props.item.symbol + ")" }
        </Title>
        <Heading tag="h3">
          {this.props.item.industry}
        </Heading>
        <Accordion active={0}>
          <AccordionPanel heading='Information'>
            <Animate enter={{"animation": "slide-down", "duration": 800, "delay": 0}}
                     leave={{"animation": "slide-up", "duration": 1000, "delay": 0}}
                     keep={true}>

              <CompanyInformationTabComponent item={this.props.item}/>
            </Animate>
          </AccordionPanel>
          <AccordionPanel heading='Charts'>
            <CompanyChartsTabComponent values={this.props.item.values}/>
          </AccordionPanel>
          <AccordionPanel heading='Raw Data'>
               <CompanyRawDataTabComponent values={this.props.item.values}/>
          </AccordionPanel>
        </Accordion>
      </Box>
    );
  }
}