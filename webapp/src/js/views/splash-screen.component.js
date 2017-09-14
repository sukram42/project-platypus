/**
 * Created by boebel on 14.09.2017.
 */
import React, {Component} from 'react';


import Card from 'grommet/components/Card';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';




export default class SplashScreenComponent extends Component {

  render() {
    return (
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

    );
  }


}
