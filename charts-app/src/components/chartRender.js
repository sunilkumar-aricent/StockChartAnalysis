import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

class ChartRender extends Component {

  categoriesGenerator() {
    let category = []
    this.props.processedData.forEach(company => {
      category = company.map(item=>item.date)}
      );
    return category;
  }

  getSeriesData(stockData, name) {
    const seriesData = [];
    const type = this.props.chartType;
    switch (type) {
      case 'line':
      case 'spline':
      case 'bar': {
        const data = stockData.map((item) => Number(item.price));
        seriesData.push({ type, name, data });
        break;
      }
      case 'combined': {
        const data = stockData.map(val => Number(val.price));
        seriesData.push({ type: 'line', data });
        seriesData.push({ type: 'column', name, data });
        break;
      }
    }
    return seriesData;
  }

  getData() {
    const seriesData = [];
    this.props.processedData.forEach((element, index) => {
      const name = this.props.compareList[index].name;
      seriesData.push(this.getSeriesData(element, name));
    });
    const finalData = [];
    seriesData.forEach(i => {
      i.forEach(j => {
        finalData.push(j);
      })
    });
    return finalData;
  }

  render() {
    const title = this.props.compareList.length === 1 ? `Chart for ${this.props.compareList[0].name}` : `Comparision chart`;
    const options = {
      legend: {
        align: 'center',
        verticalAlign: 'bottom',
        layout: 'vertical',
        x: -50,
      },
      yAxis: {
        title: {
          text: 'Price'
        },
      },
      xAxis: {
        title: {
          text: 'date'
        },
        categories: this.categoriesGenerator()
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
        text: title
      },
      series: this.getData(),
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