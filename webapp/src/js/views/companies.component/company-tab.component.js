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
        <Accordion>
          <AccordionPanel heading='Information'>
            <Animate enter={{"animation": "slide-down", "duration": 800, "delay": 0}}
                     leave={{"animation": "slide-up", "duration": 1000, "delay": 0}}
                     keep={true}>

              <CompanyInformationTabComponent item={this.props.item}/>
            </Animate>
          </AccordionPanel>
          <AccordionPanel heading='Charts'>
            <Paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat.
            </Paragraph>
          </AccordionPanel>
          <AccordionPanel heading='Raw Data'>
            <Animate enter={{"animation": "slide-down", "duration": 800, "delay": 0}}
                     leave={{"animation": "slide-up", "duration": 1000, "delay": 0}}
                     keep={true}>
               <CompanyRawDataTabComponent values={this.props.item.values}/>
            </Animate>
          </AccordionPanel>
        </Accordion>
      </Box>
    );
  }
}