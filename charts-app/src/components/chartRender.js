import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'

class ChartRender extends Component {

  state = {
    chartType: 'spline'
  }

  categoriesGenerator() {
    let category = []
    this.props.processedData.forEach(company => {
      category = company.map(item=>item.date)}
      );
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

  getSeriesData(stockData, name) {
    const seriesData = [];
    const type = this.state.chartType.toLocaleLowerCase();
    switch (type) {
      case 'line':
      case 'spline':
      default:
      case 'bar': {
        const data = stockData.map((item) => Number(item.price));
        seriesData.push({ type, name, data });
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
    const finalData = [];
    seriesData.forEach(i => {
      i.forEach(j => {
        finalData.push(j);
      })
    });
    return finalData;
  }

  render() {
    const chartTypes = ['line', 'spline', 'bar', 'combined'];
    const title = this.props.compareList.length === 1 ? `Chart for ${this.props.compareList[0].name}` : `Comparision chart`;
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