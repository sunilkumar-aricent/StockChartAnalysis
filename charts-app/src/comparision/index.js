import React from 'react';
import { connect } from 'react-redux';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import ChartRender from '../components/chartRender';
import { getComparisionListData } from './action'
import { getWatchlistData } from '../watchlist/actions'

class Comparision extends React.Component {
    state = {
        compareStocksData: [],
        chartType: 'spline'
    }

    chartTypes = ['line', 'spline', 'bar', 'combined'];

    componentDidMount() {
        const compareList = this.props.common.compareList;
        this.props.getComparisionListData(compareList, (compareListData) => {
            const compareStocksData = [];
            compareListData.forEach((element, i) => {
                const data = element.data.prices;
                const processedData = []
                for (let index = 0; index < data.length; index++) {
                    const date = data[index][0];
                    const price = data[index][1];
                    const volume = data[index][3];
                    processedData.push({ date, price, volume });
                }
                compareStocksData.push(processedData)
            });
            this.setState({ compareStocksData });
        });

    }
    renderCompareListChart() {
        if (!this.props.common.compareList || !this.props.common.compareList.length) {
            return null;
        }
        return (<ChartRender chartType={this.state.chartType} processedData={this.state.compareStocksData} compareList={this.props.common.compareList}></ChartRender>);
    }
    renderChartType = () => {
        return (
            <DropdownButton id="dropdown-item-button" title="Chart-Type" variant='primary' size='md'>
                {this.chartTypes.map(chartType => (
                    <Dropdown.Item
                        as="button"
                        onClick={() => this.setState({ chartType })}
                    >
                        {`${chartType.toUpperCase()}-Chart`}
                    </Dropdown.Item>))
                }
            </DropdownButton>
        );
    }
    render = () => (
        <div>
            {this.props.common.compareList.length === 0 ? 'Please select companies from watchlist' : '' }
            {this.renderChartType()}
            {this.renderCompareListChart()}
        </div>
    )
}

const mapStateToProps = (state) => ({
    comparision: state.comparision,
    common: state.common

})

const mapDispatchToProps = {
    getComparisionListData,
    getWatchlistData
};

const combinedStocks = connect(mapStateToProps, mapDispatchToProps)(Comparision);

export default combinedStocks;