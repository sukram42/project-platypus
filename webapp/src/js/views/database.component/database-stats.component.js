/**
 * Created by boebel on 08.09.2017.
 */

import React, {Component} from 'react';

import Table from 'grommet/components/Table';

export default class DatabaseStatsComponent extends Component {


  constructor() {
    super();

    this.state = {};
  }

  render() {
    let values = this.props.value;

    let db = values.db,
      collections = values.collections,
      objects = values.objects,
      indexes = values.indexes,
      avgObjSize = values.avgObjSize,
      dataSize = values.dataSize,
      storageSize = values.storageSize,
      indexSize = values.indexSize;



    return ( <Table scrollable={false}>
      <tbody>
      <tr>
        <td>
          Databasename
        </td>
        <td>
          {db}
        </td>
      </tr>

      <tr>
        <td>
          Collection count
        </td>
        <td>
          {collections}
        </td>
      </tr>
      <tr>
        <td>
          Objects
        </td>
        <td>
          {objects}
        </td>
      </tr>
      <tr>
        <td>
          Average Object Size
        </td>
        <td>
          {avgObjSize}
        </td>
      </tr>
      <tr>
        <td>
          Data Size
        </td>
        <td>
          {dataSize}
        </td>
      </tr>
      <tr>
        <td>
          Storage Size
        </td>
        <td>
          {storageSize}
        </td>
      </tr>
      <tr>
        <td>
          Indexes
        </td>
        <td>
          {indexes}
        </td>
      </tr>
      <tr>
        <td>
          Size of Index
        </td>
        <td>
          {indexSize}
        </td>
      </tr>
      </tbody>
    </Table>);
  }
}