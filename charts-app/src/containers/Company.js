import React, { Component, Fragment } from 'react';
import axios from 'axios';
import '../styles/company.css'

class Company extends Component {
    state={ keyword: '', searchResult: '', selectedStock: '' };
    
    getMatchesFromNse(keyword, callback) {
        // return (dispatch) => {
            // axios.get(`https://www.screener.in/api/company/search/?q=${keyword}`).then((res) => {
            axios.get(`https://www.nseindia.com/live_market/dynaContent/live_watch/get_quote/ajaxCompanySearch.jsp?search=${keyword}`).then((res) => {
                // console.log(res.data);
                // const data = getProcessedData(res.data);
                callback(res.data);
            });
        // }
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
    }

    render() {
        return <div id="company">
            <h1>Selected stock is: {this.state.selectedStock || 'NA'}</h1>
            <div className="search-container">
                <div className="search-container-inner">
                    <input type="text" onChange={(e) => this.getKeywordMatches(e)} value={this.state.keyword} />
                    <div onClick={(e) => this.selectStock(e)} dangerouslySetInnerHTML={{ __html: this.state.searchResult}}></div>
                </div>
            </div>
        </div>
    }
}

export default Company;