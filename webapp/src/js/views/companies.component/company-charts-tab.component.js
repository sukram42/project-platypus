/**
 * Created by boebel on 06.09.2017.
 */
/**
 * Created by boebel on 06.09.2017.
 */
import React, {Component} from 'react';

import Section from 'grommet/components/Section';


import PriceChartComponent from '../data-section.component/price-chart.component';

export default class CompanyChartsTabComponent extends Component {

  render() {
    return (
      <Section>
        <PriceChartComponent values={this.props.values}/>
      </Section>
    );
  }
}