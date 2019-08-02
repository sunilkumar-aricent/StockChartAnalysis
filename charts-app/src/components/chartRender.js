import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'

class ChartRender extends Component {

  state = {
    chartType: 'spline'
  }

  // xAxisLable() {
  //   a = a + 1;
  //   return this.props.processedData[a].date
  // }

  categoriesGenerator() {
    // const category = []
    // this.props.processedData.map(company => { company.map(val => category.push(val.date)) })
    const category = this.props.processedData.map(item => item.date);
    return category;
  }

  // seriesGenerator() {
  //   const seriesData = [];
  //   const type = this.state.chartType;
  //   const names = this.props.selectStock;
  //   let i;
  //   //const data = this.props.processedData.map(val => Number(val.price))
  //   switch (this.state.chartType.toLowerCase()) {
  //     case 'line':
  //       i = 0;
  //       this.props.processedData.map((companyData) => {
  //         const data = companyData.map(val => Number(val.price));
  //         seriesData.push({ type, name: names[i], data });
  //         i++;
  //       })

  //       break;
  //     case 'spline': i = 0;
  //       this.props.processedData.map((companyData) => {
  //         const data = companyData.map(val => Number(val.price));
  //         seriesData.push({ type, name: names[i], data });
  //         i++;
  //       })
  //       break;
  //     case 'bar': i = 0;
  //       this.props.processedData.map((companyData) => {
  //         const data = companyData.map(val => Number(val.price));
  //         seriesData.push({ type, name: names[i], data });
  //         i++;
  //       })
  //       break;
  //     case 'combined':
  //       i = 0;
  //       this.props.processedData.map((companyData) => {
  //         const data = companyData.map(val => Number(val.price));
  //         seriesData.push({ type: 'line', name: names[i], data });
  //         seriesData.push({ type: 'column', name: names[i], data });
  //         i++;
  //       })
  //       break;
  //     default: i = 0;
  //       // this.props.processedData.map((companyData) => {
  //       //   const data = companyData.map(val => Number(val.price));
  //       //   seriesData.push({ type, name: names[i], data });
  //       //   i++;
  //       // })
  //       const data = this.props.processedData.map((item) => Number(item.price));
  //       seriesData.push({ name: this.props.selectStock.name, data });
  //       i++;
  //       break;
  //   }
  //   return seriesData;
  // }

  getSeriesData() {
    const seriesData = [];
    const type = this.state.chartType;
    const name = this.props.selectStock;
    switch (this.state.chartType.toLowerCase()) {
      case 'line':
      case 'spline':
      case 'bar':
        const data = this.props.processedData.map((item) => Number(item.price));
        seriesData.push({ type, name, data });
        break;
      case 'combined':
        this.props.processedData.map((companyData) => {
          const data = this.props.processedData.map(val => Number(val.price));
          seriesData.push({ type: 'line', data });
          seriesData.push({ type: 'column', name, data });
        })
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
          text: 'Price'
          //Object.keys(this.props.processedData[0])[1].toUpperCase()
        },
      },
      xAxis: {
        title: {
          text: 'date'
          //Object.keys(this.props.processedData[0])[0].toUpperCase()
        },
        categories: this.categoriesGenerator()
        //this.props.processedData.map(company =>{company.map(val=>val.date)})
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
      series: this.getSeriesData(),
    };

    return (<div>
      <DropdownButton id="dropdown-item-button" title="Chart-Type" variant='secondary' size='sm'>
        {chartTypes.map(chartType => (
          <Dropdown.Item
            as="button"
            onClick={() => this.setState({ chartType })}
          >
            {`${chartType.toUpperCase()}-Chart`}
          </Dropdown.Item>))
        }
      </DropdownButton>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
    </div>)
  }
}

export default ChartRender;