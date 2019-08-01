import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import '../common/styles/company.css';
import Typeahead from '../common/components/typeahead';
import styles from './styles.module.css';
import { getHistoricalData, searchCompany } from './action';
import ChartRender from '../components/chartRender';
import { processHistoricalData } from '../common/util';

class Company extends Component {
    state={ selectedCompany: null, historicalData: [] };
    
    selectCompany = (selection) => {
        this.setState({ selectedCompany: { name: selection.name, id: selection.id }});
        this.props.getHistoricalData(selection.id, (data) => {
            this.setState({ historicalData: data });
        });
    }

    renderHistoricalData() {
        const data = this.state.historicalData;
        if(data.length === 0) {
            return null;
        }
        const processedData = processHistoricalData(data.prices);
        return (
            <ChartRender processedData = {processedData} selectStock = {this.state.selectedCompany}/>
        );
    }

    addToWatchlist = () => {
        const selectedCompanyId = this.state.selectedCompany.id;
        const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
        if (watchlist.indexOf(selectedCompanyId) === -1) {
            watchlist.push(selectedCompanyId);
            localStorage.setItem('watchlist', JSON.stringify(watchlist));
        } else {
            alert('stock already exist in the watchlist');
        }
    }

    render() {
        return (
            <div id="company">
                <Typeahead searchCompany={this.props.searchCompany} selectCompany={this.selectCompany} />
                <h1>{!this.state.selectedCompany ? 'No company selected' : `Selected company is: ${this.state.selectedCompany.name}`}</h1>
                {this.state.selectedCompany && <button className="btn btn-primary" onClick={this.addToWatchlist}>Add to watchlist</button>}
                {/* <button className={`btn btn-primary ${styles.testButton}`}>test button</button> */}
                {this.renderHistoricalData()}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    company: state.company 
})

const mapDispatchToProps = {
    getHistoricalData,
    searchCompany
};

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(Company);

export default connectedComponent;