/**
 * Created by boebel on 08.09.2017.
 */

import React, {Component} from 'react';

import Table from 'grommet/components/Table';
import Box from 'grommet/components/Box';
import Timestamp from 'grommet/components/Timestamp';


export default class DatabaseLogComponent extends Component {


  constructor() {
    super();

    this.state = {};
  }

  render() {

    let logs = this.props.value;
    let items = logs.log.slice(logs.log.length - 200).reverse()

    return (
      <Box pad="medium">
        <Table>
          <tbody>
          {logs.log ? items.reverse().map((item, index) =>
            <tr key={index}>
              <td>{index + 1}</td>
              <td><Timestamp value={item.split(" I ", 2)[0]} fields={['date', 'time', 'seconds']}/></td>
              <td>{item.split(" I ", 2)[1]}</td>
            </tr>) : "no logs at the moment"}
          </tbody>
        </Table>
        <paragraph>Values cutted due to performance</paragraph>
      </Box>
    );
  }
}