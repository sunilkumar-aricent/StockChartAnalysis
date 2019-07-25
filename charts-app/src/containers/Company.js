import React, { Component, Fragment } from 'react';
import axios from 'axios';
import '../styles/company.css';
import Loader from '../components/loader.js';

const historicalDataApi = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&outputsize=full&apikey=LYK5FRW7A27I9REB';

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

    getHistoricalData(stock) {
        this.setState({ showLoader: true })
        // &symbol=NSE:TCS
        axios.get(`${historicalDataApi}&symbol=NSE:${stock}`).then((res) => {
            console.log(res.data);
            this.setState({ historicalData: res.data, showLoader: false });
        })
    }

    getKeywordMatches(e) {
        const keyword = e.target.value
        this.setState({ keyword });
        if(keyword.length > 1) {
            this.getMatchesFromNse(keyword, (searchResult) => {
                this.setState({ searchResult });
            });
        }
    }

    selectStock(e) {
        // need refactoring..
        e.preventDefault();
        this.setState({ searchResult: '' });
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
        this.getHistoricalData(stockDetails.symbol);
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
            <table>
                <tr>
                    <th>Date</th>
                    <th>Price</th>
                    <th>Volume</th>
                </tr>
                { html }
            </table>
        );
    }

    render() {
        return (
            <div id="company">
                <h1>Selected stock is: {this.state.selectedStock || 'NA'}</h1>
                <div className="search-container">
                    <div className="search-container-inner">
                        <input type="text" onChange={(e) => this.getKeywordMatches(e)} value={this.state.keyword} />
                        <div onClick={(e) => this.selectStock(e)} dangerouslySetInnerHTML={{ __html: this.state.searchResult}}></div>
                    </div>
                </div>
                {this.renderHistoricalData()}
                {this.state.showLoader && <Loader />} 
            </div>
        )
    }
}

export default Company;