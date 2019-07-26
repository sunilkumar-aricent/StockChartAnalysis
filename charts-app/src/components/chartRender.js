import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
let a = -1;

class ChartRender extends Component {

  xAxisLable() {
    a = a + 1;
    return this.props.processedData[a].date
  }

  render() {
    const options = {
      chart: {
        type: 'line'
      },
      yAxis: {
        title: {
          text: Object.keys(this.props.processedData[0])[1].toUpperCase()
        },
      },
      xAxis: {
        title: {
          text: Object.keys(this.props.processedData[0])[0].toUpperCase()
        },
        categories: this.props.processedData.map(val => val.date)
        //   labels :{
        //        formatter :()=>this.xAxisLable()

        // }
      },
      title: {
        text: `STOCK Line Chart for ${this.props.selectStock}`
      },
      series: [
        {
          name: `FOR COMPANY - ${this.props.selectStock}`,
          data: this.props.processedData.map(val => Number(val.price))
        }
      ]
    };

    return (<div>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
    </div>)
  }
}

export default ChartRender;