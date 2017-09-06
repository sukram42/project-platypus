/**
 * Created by boebel on 06.09.2017.
 */

/**
 * Created by boebel on 06.09.2017.
 */
/**
 * Created by boebel on 06.09.2017.
 */
import React, {Component} from 'react';

import Chart,{Axis,Base,Grid,Line,Layers,MarkerLabel} from 'grommet/components/Chart';
import Value from 'grommet/components/Value';


export default class PriceChartComponent extends Component {

  getPriceArray() {
    let items = this.props.values;

    let prices = items.map((item, index) => {
      return item.price;
    });

    console.dir(prices);
    return prices;
  }


  render() {
    return (
      <Chart>
        <Axis count={5}
              labels={[{"index": 2, "label": "50"}, {"index": 4, "label": "200"}]}
              vertical={true}/>
        <Chart vertical={true}>
          <MarkerLabel count={12}
                       index={11}
                       label={<Value value={50}/>}/>
          <Base height='large'
                width='large'/>
          <Layers>
            <Grid rows={5}
                  columns={3} />
            <Line values={this.getPriceArray()}
                  max={170}
                  min={160}
                  colorIndex='accent-1'
                  activeIndex={1}/>
          </Layers>

        </Chart>
      </Chart>
    );
  }
}
