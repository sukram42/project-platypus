/**
 * Created by boebel on 05.09.2017.
 */

import React, {Component} from 'react';


import Box from 'grommet/components/Box';
import Anchor from 'grommet/components/Anchor';
import Sidebar from 'grommet/components/Sidebar';
import Title from 'grommet/components/Title';
import Header from 'grommet/components/Header';
import Footer from 'grommet/components/Footer';
import Menu from 'grommet/components/Menu';


export default class SidebarComponent extends Component {

  render() {
    return (
      <Sidebar colorIndex='neutral-1'
               fixed={false}>
        <Header pad='medium'
                justify='between'>

          <Anchor path={{ path: '/home', index: true }}>
            <Title>Titel</Title>
          </Anchor>

        </Header>
        <Box flex='grow'
             justify='start'>
          <Menu primary={true}>
            <Anchor path={{ path: '/companies', index: true }}>
              Data-Visualisation
            </Anchor>
            <Anchor path={{ path: '/database', index: true }}>
              Database Load
            </Anchor>
            <Anchor path={{ path: '/server', index: true }}>
              Server Load
            </Anchor>
          </Menu>
        </Box>
        <Footer pad='medium'>
        </Footer>
      </Sidebar>
    )
  }
}// className={this.props.active ==1?"active":""}