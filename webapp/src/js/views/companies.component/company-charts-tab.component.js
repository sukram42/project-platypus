/**
 * Created by boebel on 06.09.2017.
 */
/**
 * Created by boebel on 06.09.2017.
 */
import React, {Component} from 'react';

import Table from 'grommet/components/Table';
import Section from 'grommet/components/Section';
import Tile from 'grommet/components/Tile';
import Tiles from 'grommet/components/Tiles';
import Card from 'grommet/components/Card';


import PriceChartComponent from './price-chart.component';

export default class CompanyChartsTabComponent extends Component {

  render() {
    return (
     <Section>

              <PriceChartComponent values = {this.props.values}/>

     </Section>
    );
  }
}