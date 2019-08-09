import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

class ChartRender extends Component {

  itemWithMaxDataPoints = [];

  categoriesGenerator() {
    // find company with maximum data points
    this.itemWithMaxDataPoints = (this.props.processedData || []).reduce((prev, current) => (prev.length > current.length) ? prev : current);
    const category = this.itemWithMaxDataPoints.map(item=>item.date);
    return category;
  }

  getSeriesData(stockData, name) {
    const seriesData = [];
    const type = this.props.chartType;
    switch (type) {
      case 'line':
      case 'spline':
      case 'bar': {
        let revenueData = stockData.map((item) => item.revenue);
        let profitData = stockData.map((item) => item.profit);
        debugger;
        if (revenueData.length < this.itemWithMaxDataPoints.length) {
          revenueData = revenueData.reverse();
          profitData = profitData.reverse();
          for (let i = 0; i < (this.itemWithMaxDataPoints.length - stockData.length); i++) {
            revenueData.push(null);
            profitData.push(null);
          }
          revenueData = revenueData.reverse();
          profitData = profitData.reverse();
        }
        seriesData.push({ type: 'column', name: `${name}_revenue`, data: revenueData, connectNulls: true  });
        seriesData.push({ type: 'spline', name: `${name}_profit`, data: profitData, yAxis: 1, connectNulls: true });
        break;
      }
      
      case 'combined': {
        const data = stockData.map(val => Number(val.price));
        seriesData.push({ type: 'line', name, data });
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
    debugger;
    const finalData = [];
    seriesData.forEach(i => {
      i.forEach(j => {
        finalData.push(j);
      })
    });
    return finalData;
  }

  render() {
    if(!this.props.processedData || !this.props.processedData.length) {
      return null;
    }
    const title = this.props.compareList.length === 1 ? `Chart for ${this.props.compareList[0].name}` : `Comparision chart`;
    const options = {
      // chart: {
      //   marginRight: 260,
      //   marginLeft: 260
      // },
      legend: {
        align: 'center',
        verticalAlign: 'bottom',
        layout: 'vertical',
        x: -50,
      },
      yAxis: [{
    //     title: {
    //       text: 'Price'
    //     },
    //   },{
    //     title: {
    //       text: 'Volume'
    //     },
    //     opposite: true
    //   },{
        title: {
          text: 'Revenue'
        },
      },{
        title: {
          text: 'Profit'
        },
        opposite: true
      }],
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