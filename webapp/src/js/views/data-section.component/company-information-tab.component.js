/**
 * Created by boebel on 06.09.2017.
 */
import React, {Component} from 'react';

import Table from 'grommet/components/Table';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';

export default class CompanyInformationTabComponent extends Component {

  render() {
    return (
      <Box size="medium" style={{"fontSize": "125%"}}>
        <Table scrollable={false}>
          <tbody>
          <tr>
            <td>
              Exchange
            </td>
            <td>
              {this.props.item.exchange}
            </td>
          </tr>
          <tr>
            <td>
              Website
            </td>

            <td>
              <Anchor href={this.props.item.website}>{this.props.item.website}</Anchor>
            </td>
          </tr>

          <tr>
            <td>
              CEO
            </td>
            <td>
              {this.props.item.CEO}
            </td>
          </tr>
          <tr>
            <td>
              Sector
            </td>
            <td>
              {this.props.item.sector}
            </td>
          </tr>
          </tbody>
        </Table>
        <Table>
          <tbody>
          <tr>
            <td>{this.props.item.description}</td>
          </tr>
          </tbody>
        </Table>
      </Box>
    );
  }
}