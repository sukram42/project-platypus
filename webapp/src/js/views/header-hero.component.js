/**
 * Created by boebel on 04.09.2017.
 */


import React, {Component} from 'react';


import Hero from 'grommet/components/Hero';
import Box from 'grommet/components/Box';
import Card from 'grommet/components/Card';
import Anchor from 'grommet/components/Anchor';
import Image from 'grommet/components/Image';

export default class HeaderHero extends Component {

  render() {
    return (
      <Box size="full">
        <Hero background={<Image src={this.props.image} fit='cover' full="vertical"/>} size="large" backgroundColorIndex='dark'>
          <Box direction='row'
               justify='center'
               align='center'>
            <Box basis='1/2'
                 align='end'
                 pad='medium'/>
            <Box basis='1/2'
                 align='start'
                 pad='medium'>
              <Box colorIndex='grey-1-a'>
                <Card heading={this.props.heading}
                      description={this.props.description}
                      label={this.props.label}
                      link={<Anchor path={{ path: '/home', index: true }}
                                    primary={true}
                                    label={this.props.linkLabel}/>}/>
              </Box>
            </Box>
          </Box>

        </Hero>
      </Box>
    )
  }
}