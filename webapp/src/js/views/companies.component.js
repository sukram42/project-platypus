/**
 * Created by boebel on 31.08.2017.
 */
import React, {Component} from 'react';
import DataStore from '../stores/DataStore';

import Split from 'grommet/components/Split';
import Tabs from 'grommet/components/Tabs';
import Tab from 'grommet/components/Tab';
import Spinning from 'grommet/components/icons/Spinning';

import * as DataActions from '../actions/DataActions';

import SidebarComponent from "./sidebar.component";
import CompanyTabComponent from "./companies.component/company-tab.component";

export default class CompaniesComponent extends Component {
  constructor() {
    super();


    this.getData = this.getData.bind(this);

    DataActions.startPolling();



    this.state = {
      values : DataStore.getData()
    };
  }

  componentDidMount() {
    DataActions.fetchData();
    console.log(this.props.match.params.symbol);
  }

  componentWillMount() {
    DataStore.on('data_changed', this.getData);
    DataActions.fetchData();
  }

  componentWillUnmount() {
    DataStore.removeListener('data_changed', this.getData);
    DataActions.stopPolling();
  }

  getData() {
    this.setState({
      values: DataStore.getData()
    });
  }


  render() {
    let props = this.props.match.params.symbol;
    return (
      <Split fixed={true}
             flex='right'
             separator={false}>

        <SidebarComponent active={1}/>

        <Tabs activeIndex={this.state.activeIndex!=null? this.state.activeIndex:+props} onActive ={(activeIndex)=>this.setState({activeIndex:activeIndex})}>

          {this.state.values?this.state.values.map((item,index)=>
          <Tab key={index} title = {item.symbol}  >
             <CompanyTabComponent item={item} />
          </Tab> ):<Spinning size="large"/> }
        </Tabs>
      </Split>

    );
  }
}
