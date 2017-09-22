import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import Article from 'grommet/components/Article';
import Section from 'grommet/components/Section';
import Headline from 'grommet/components/Headline';


import DataSectionComponent from './data-section.component/data-section.component';
import DataStore from '../stores/DataStore';


import * as DataActions from '../actions/DataActions';
import SplashScreenComponent from "./splash-screen.component";


export default class IndexCompany extends Component {

  constructor() {
    super();


    this.getCompanyNames = this.getCompanyNames.bind(this);

    DataStore.on('company_names_changed', this.getCompanyNames)

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
      <Article scrollStep={true} controls={true}>

        <Section pad="none"
                 margin="none"
                 justify='center'
                 full='vertical'
                 texture="img/big-ben1.jpg"
        >

          <SplashScreenComponent onClick={() => window.scrollTo(500, 500)}/>
        </Section>

        <Section pad='large'
                 justify='center'
                 align='center'
                 full='vertical'
                 colorIndex='grey-4'>
          <Headline margin='none'>
            Section 3
          </Headline>
        </Section>

          <Section pad="none"
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
          <Headline margin='none'>
            Section 4
          </Headline>
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
