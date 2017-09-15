import React, {Component} from 'react';

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

   this.state = {
      companyNames : DataStore.getCompanyNames(),
    }
  }

  /**
   * Will be executed when the component is rendered
   */
  componentWillMount() {
     // Initialisation EventListener for Change of CompanyNames
    DataStore.on('company_names_changed', this.getCompanyNames);
    //Fetch CompanyNames to be able to render the Website
    DataActions.fetchCompanyNames();
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
  getCompanyNames(){
    this.setState({
      companyNames: DataStore.getCompanyNames()
    });
  }

  render() {
    return (
      <Article scrollStep={true}>

        <Section pad='large'
                 justify='center'
                 full='vertical'
                 texture="img/big-ben.jpg"
        >
          <SplashScreenComponent/>
        </Section>

        <Section pad='medium'
                 justify='center'
                 full='vertical'
                  >

            <DataSectionComponent companies ={this.state.companyNames}/>
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
