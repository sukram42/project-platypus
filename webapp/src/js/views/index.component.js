import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import Article from 'grommet/components/Article';
import Section from 'grommet/components/Section';
import Headline from 'grommet/components/Headline';


import DataSectionComponent from './data-section.component/data-section.component';
import DataStore from '../stores/DataStore';
import * as DataActions from '../actions/DataActions';

import SplashScreenComponent from "./index.component/splash-screen.component";
import OverviewComponent from "./index.component/overview.component";
import RequestSectionComponent from "./request-section.component/request-section.component";


export default class IndexCompany extends Component {

  constructor() {
    super();


    this.getCompanyNames = this.getCompanyNames.bind(this);

    DataStore.on('company_names_changed', this.getCompanyNames);

    DataActions.fetchCompanyNames();

    this.state = {
      companyNames: DataStore.getCompanyNames(),
    }
  }

  /**
   * Will be executed when the component is rendered
   */
  componentWillMount() {

  }

  /**
   * Will be executed when the component is unmounting
   */
  componentWillUnmount() {
    /**
     * Removal of EventListener for Change of CompanyNames
     */
    DataStore.removeListener('data_changed', this.getCompanyNames);
  }

  /**
   * Gets the names of the companies and pushes them into the component's state
   */
  getCompanyNames() {
    this.setState({
      companyNames: DataStore.getCompanyNames()
    });
  }

  handleClick() {
    window.scrollTo(500);
    const companyPart = ReactDOM.findDOMNode(this.refs.companies);
    console.log(companyPart.offsetTop);
  }

  render() {
    return (
      <Article scrollStep={true} controls={true} style={{"overflow":"hidden" }}>
        <Section pad="none"
                 style={{"backgroundAttachment": "fixed"}}
                 margin="none"
                 justify='center'
                 full='vertical'
                 texture="img/big-ben_small.jpg"
        >

          <SplashScreenComponent onClick={() => window.scrollTo(500, 500)}/>
        </Section>

        <Section
            pad="none"
            justify='center'
            margin="none"
            full='vertical'
            colorIndex="accent-3">
          <OverviewComponent />
        </Section>

          <Section pad="none"

                   justify='center'
                   margin="none"
                   full='vertical'
                   ref="companies"
          >
            <DataSectionComponent companies={this.state.companyNames}/>
          </Section>


        <Section pad='large'
                 justify='center'
                 align='center'
                 full='vertical'
        >
          <RequestSectionComponent/>
        </Section>

        <Section pad='large'
                 justify='center'
                 align='center'
                 full='vertical'>
          <Headline margin='none'>
            Section 5
          </Headline>
        </Section>
      </Article>
    );
  }


}
