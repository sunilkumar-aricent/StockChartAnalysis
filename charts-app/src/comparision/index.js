import React from 'react';
import { connect } from 'react-redux';
import ChartRender from '../components/chartRender';
import { getComparisionListData } from './action'

class Comparision extends React.Component {
    state = {
        compareStocksData: [],

    }

    componentDidMount() {

        this.props.getComparisionListData(this.props.comparision.compareList, (compareListData) => {
            const compareStocksData = [];
            compareListData.forEach((element, index) => {
                const keys = Object.keys(element.data['Time Series (Daily)']);
                const values = Object.values(element.data['Time Series (Daily)']);
                const compareList2 = []
                for (let index = 0; index < 100; index++) {
                    const date = keys[index];
                    const price = values[index]['4. close'];
                    const volume = values[index]['5. volume'];
                    compareList2.push({ date, price, volume });
                }
                compareStocksData.push(compareList2)
            });
            this.setState({ compareStocksData });
        });
    }
    renderCompareListChart() {
        if (!this.props.comparision.compareList || !this.props.comparision.compareList) {
            return null;
        }
        const compareChart = //this.state.compareStocksData.map((companyData)=>{
            <ChartRender processedData={this.state.compareStocksData} selectStock={this.props.comparision.compareList}></ChartRender>
        //  });
        return compareChart

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

})

const mapDispatchToProps = {
    getComparisionListData
};

const combinedStocks = connect(mapStateToProps, mapDispatchToProps)(Comparision);

export default combinedStocks;