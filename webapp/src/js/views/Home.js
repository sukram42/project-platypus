/**
 * Created by boebel on 31.08.2017.
 */
import React, {Component} from 'react';
import DataStore from '../stores/DataStore';


export default class Home extends Component {

  constructor() {
    super();

    this.state = {
      values: this.getData()
    }
  }

  componentWillMount() {


    DataStore.on('change', () => {
      this.setState({
        values: this.getData()
      });
      console.dir(this.state);
    });
  }

  componentWillUnmount() {
    DataStore.removeListener('change', this.getData());
  }

  getData() {
    return DataStore.getAll();
  }

  render() {
    return (
      <div>
        <h1>Hallo {this.props.name}</h1>
        <ul>
          {this.state.values.map((item, index) => <li key={index}>{item ? item.companyName : ""}</li>) }
        </ul>
      </div>
    );
  }
}