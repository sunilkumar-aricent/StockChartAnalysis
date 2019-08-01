import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'

class ChartRender extends Component {

  state = {
    chartType: ''
  }

  // xAxisLable() {
  //   a = a + 1;
  //   return this.props.processedData[a].date
  // }

  seriesGenerator() {
    const seriesData = [];
    const type = this.state.chartType;
    const name = this.props.selectStock;
    const data = this.props.processedData.map(val => Number(val.price))
    switch (this.state.chartType.toLowerCase()) {
      case 'line':
        seriesData.push({ type, name, data })
        break;
      case 'spline': seriesData.push({ type, name, data })
        break;
      case 'bar': seriesData.push({ type: 'column', name, data })
        break;
      case 'combined': seriesData.push({ type: 'line', name, data });
        seriesData.push({ type: 'column', name:'', data });
        break;
      default: seriesData.push({ type, name, data })
        break;
    }
    return seriesData;
  }

  render() {
    const chartTypes = ['line', 'spline', 'bar', 'combined'];
    const options = {
      legend: {
        align: 'right',
        verticalAlign: 'top',
        layout: 'vertical',
        x: -50,
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
      labels: {
        items: [{

          style: {
            left: '50px',
            top: '18px',
            color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
          }
        }]
      },
      title: {
        text: `STOCK Line Chart for ${this.props.selectStock}`
      },
      series: this.seriesGenerator(),
    };

    return (<div>
      <DropdownButton id="dropdown-item-button" title="Chart-Type" variant='secondary' size='sm'>
        {chartTypes.map(chartType => <Dropdown.Item as="button" onClick={() => this.setState({ chartType: chartType })}>{`${chartType.toUpperCase()}-Chart`}</Dropdown.Item>)}
      </DropdownButton>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
    </div>)
  }
}

export default ChartRender;