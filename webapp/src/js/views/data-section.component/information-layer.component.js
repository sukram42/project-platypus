/**
 * Created by boebel on 19.09.2017.
 */

import React, {Component} from 'react';


import Layer from 'grommet/components/Layer';
import Box from 'grommet/components/Box';
import Image from 'grommet/components/Image';
import Heading from 'grommet/components/Heading';
import CompanyInformationTabComponent from "./company-information-tab.component";


export default class InformationLayerComponent extends Component {

  constructor() {
    super();

  }

  render() {
    let information = this.props.information;

    return (
      <Layer flush={false}
             closer={true}
             align='right'
             onClose={this.props.onClose}
      >

        <Box align="center" pad="medium">
          <Image size="small"
                 src={'https://storage.googleapis.com/iex/api/logos/' + information.symbol + '.png'}
                 style={{"borderRadius": "50%"}}/>
          <Heading uppercase={true}
                   truncate={false}
                   strong={false}
                   align='center'
                   margin="medium">
            {information.companyName.length<20?information.companyName:information.symbol}
          </Heading>
          <CompanyInformationTabComponent item={information}/>
        </Box>
      </Layer>
    );
  }
}