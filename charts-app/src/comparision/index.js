import React from 'react';
import { connect } from 'react-redux';
import ChartRender from '../components/chartRender';
import { getComparisionListData } from './action'
import { getWatchlistData } from '../watchlist/actions'

class Comparision extends React.Component {
    state = {
        compareStocksData: [],
    }

    componentDidMount() {
        // const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
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

        // this.props.getWatchlistData(this.state.watchlist, (watchlist) => {
        //     console.log(watchlist);
        //     const watchlistData = [];
        //     watchlist.forEach((element, index) => {
        //         const price = element.data.prices[0][1];
        //         const volume = element.data.prices[0][3];
        //         watchlistData.push({ price, volume });
        //     });
        //     this.setState({ watchlistData });
        // });
    }
    renderCompareListChart() {
        if (!this.props.common.compareList || !this.props.common.compareList.length) {
            return null;
        }
        return (<ChartRender processedData={this.state.compareStocksData} compareList={this.props.common.compareList}></ChartRender>);
    }
    render = () => (
        <div>
            This is comparision component
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