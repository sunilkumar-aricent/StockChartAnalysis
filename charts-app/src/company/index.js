import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import '../common/styles/company.css';
import { getHistoricalData } from './action';

class Company extends Component {
    state={ keyword: '', searchResult: '', selectedStock: '', historicalData: [] };
    
    getMatchesFromNse(keyword, callback) {
        // axios.get(`https://www.screener.in/api/company/search/?q=${keyword}`).then((res) => {
        axios.get(`https://www.nseindia.com/live_market/dynaContent/live_watch/get_quote/ajaxCompanySearch.jsp?search=${keyword}`).then((res) => {
            // console.log(res.data);
            // const data = getProcessedData(res.data);
            callback(res.data);
        });
    }

    getKeywordMatches(e) {
        const keyword = e.target.value
        this.setState({ keyword });
        if(keyword.length > 1) {
            this.getMatchesFromNse(keyword, (searchResult) => {
                this.setState({ searchResult });
            });
        } else {
            this.setState({ searchResult: '' });
        }
    }

    selectStock(e) {
        // need refactoring..
        e.preventDefault();
        this.setState({ searchResult: '', keyword: '' });
        const stockDetails = {};
        let target = e.target;
        if(target.nodeName !== 'A') {
            target = target.parentElement;
        }
        if(target.nodeName !== 'A') {
            target = target.parentElement;
        }
        if(target.nodeName !== 'A') {
            target = target.parentElement;
        }
        const queryString = target.getAttribute('href').split('?')[1];
        queryString.split('&').map(item => {
            const splits = item.split('=');
            stockDetails[splits[0]] = splits[1];
        });
        this.setState({ selectedStock: stockDetails.symbol });
        this.props.getHistoricalData(stockDetails.symbol, (data) => {
            this.setState({ historicalData: data });
        });
    }

    renderHistoricalData() {
        const data = this.state.historicalData;
        if(data.length === 0) {
            return null;
        }
        const processedData = [];
        const keys = Object.keys(data['Time Series (Daily)']);
        const values = Object.values(data['Time Series (Daily)']);
        // values.map((item, index) => {
        //     const date = keys[index];
        //     const price = item['4. close'];
        //     const volume = item['5. volume'];
        //     processedData.push({ date, price, volume });
        // });
        for(let index=0; index<100; index++) {
            const date = keys[index];
            const price = values[index]['4. close'];
            const volume = values[index]['5. volume'];
            processedData.push({ date, price, volume });
        }
        const html = processedData.map((item, index) => {
            return(
                <tr key={index}>
                    <td>{item.date}</td>
                    <td>{item.price}</td>
                    <td>{item.volume}</td>
                </tr>
            );
        });
        return (
            <table className="table table-stripped">
                <tr>
                    <th>Date</th>
                    <th>Price</th>
                    <th>Volume</th>
                </tr>
                { html }
            </table>
        );
    }

    addToWatchlist = () => {
        debugger;
        const selectedStock = this.state.selectedStock;
        const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
        // if (watchlist.indexOf(selectedStock)) === -1) {
        //     // add to watchlist
        //     watchlist.push(selectedStock);
        //     localStorage.setItem('watchlist', watchlist);
        // } else {
        //     // stock already exist
        //     alert('stock already exist in the watchlist');
        // }
        if (watchlist.indexOf(selectedStock) === -1) {
            watchlist.push(selectedStock);
            localStorage.setItem('watchlist', JSON.stringify(watchlist));
        } else {
            // stock already exist
            alert('stock already exist in the watchlist');
        }
    }

    render() {
        return (
            <div id="company">
                <div className="search-container">
                    <div className="search-container-inner">
                        <input type="text" onChange={(e) => this.getKeywordMatches(e)} value={this.state.keyword} />
                        <div class="search-result" onClick={(e) => this.selectStock(e)} dangerouslySetInnerHTML={{ __html: this.state.searchResult}}></div>
                    </div>
                </div>
                <h1>{!this.state.selectedStock ? 'No stock selected' : `Selected stock is: ${this.state.selectedStock}`}</h1>
                {this.state.selectedStock && <button className="btn btn-primary" onClick={this.addToWatchlist}>Add to watchlist</button>}
                {this.renderHistoricalData()}
            </div>
        )
    }
}

// export default Company;

const mapStateToProps = (state) => ({
    company: state.company 
})

const mapDispatchToProps = {
    getHistoricalData
};

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(Company);

export default connectedComponent;