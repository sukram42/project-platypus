/**
 * Created by boebel on 06.09.2017.
 */

import React, {Component} from 'react';

import Table from 'grommet/components/Table';
import TableHeader from 'grommet/components/TableHeader';
import TableRow from 'grommet/components/TableRow';
import Box from 'grommet/components/Box';
import Spinning from 'grommet/components/icons/Spinning';
import Value from 'grommet/components/Value';
import Multiple from 'grommet/components/icons/base/Multiple';
import Timestamp from 'grommet/components/Timestamp';
import NumberInput from 'grommet/components/NumberInput';
import Tip from 'grommet/components/Tip';

export default class CompanyRawDataTabComponent extends Component {


  constructor() {
    super();

    this.state = {
      content: [],
      itemLength:0,
      elementCount: 50,
      elementDistance: 100
    };


  }


  componentWillMount() {
    this.getItemsReady(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.getItemsReady(nextProps);
  }

  getItemsReady(nextProps) {
    let state = this.state;
    let items = nextProps.values;
    this.state.itemLength = items.length;
    items = items.filter(function (value, index, Arr) {
      return index % state.elementDistance == 0;
    });

    let content = items.slice(Math.max(items.length - this.state.elementCount, 1));

    this.setState(
      {content}
    )
  }

  render() {
    return (
      <div>
        <Box alignContent="center" full="horizontal" direction="row">
          <NumberInput id="count_changer"
                       defaultValue={+this.state.elementCount + 1}
                       step={1}
                       onChange={(number) => {
                         this.setState({elementCount: number.target.value}, () => this.getItemsReady(this.props));

                       }}/>
          <Tip target='count_changer' onClose={() => {
          }}>
            Choose the count of last values.
          </Tip>
          <NumberInput id="dif_changer" defaultValue={+this.state.elementDistance + 1}
                       step={1}
                       onChange={(number) => {
                         this.setState({elementDistance: number.target.value}, () => this.getItemsReady(this.props));
                       }}/>
          <Tip target='dif_changer' onClose={() => {
          }}>
            Choose the difference between the elements.
          </Tip>
          <Box justify="center">
            <Value value={this.state.content ?this.state.itemLength:0}
                   icon={<Multiple />}
                   size="small"
            />
          </Box>
        </Box>
        <Table>

          <TableHeader labels={['', 'Time', 'Date', 'Price', 'Change', 'Volume', 'Delayed Price', 'Delayed Price Time']}
          />
          <tbody>
          {this.state.content ? this.state.content.map((item, index) =>
            <TableRow key={index}>
              <td>
                {++index}
              </td>
              <td>
                {item.time}
              </td>
              <td>
                {item.date}
              </td>
              <td>
                {item.price}
              </td>
              <td>
                {item.change}
              </td>
              <td>
                {item.volume}
              </td>

              <td>
                {item.delayedPrice}
              </td>
              <td>
                <Timestamp value={new Date(item.delayedPriceTime)}/>
              </td>
            </TableRow>
          ) : <Spinning/>}
          </tbody>
        </Table>
      </div>
    )
      ;
  }
}