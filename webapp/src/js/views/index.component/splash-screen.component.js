/**
 * Created by boebel on 14.09.2017.
 */
import React, {Component} from 'react';


import Card from 'grommet/components/Card';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Headline from 'grommet/components/Headline';
import Image from 'grommet/components/Image';

import Texts from '../../texts';

export default class SplashScreenComponent extends React.PureComponent {

  shouldComponentUpdate() {
    return false;
  }

  render() {

    let texts = Texts.splashscreen;

    return (
      <Box direction='column' justify="center" align="center" pad={{"between": "large"}}>
        <Image src={texts.icon}
               size="small"/>
        <Box>
          <Heading className="mainHeading"
                   uppercase={true}
                   strong={true}
                   tag="h1">
            {texts.header}
          </Heading>
          <Heading className="mainCaption"
                   uppercase={true}
                   strong={false}
                   tag="h3">
            {texts.caption}
          </Heading>
        </Box>

      </Box>

    );
  }


}
