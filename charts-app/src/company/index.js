import React, { Component} from 'react';
import { connect } from 'react-redux';
// import DropdownButton from 'react-bootstrap/DropdownButton';
// import Dropdown from 'react-bootstrap/Dropdown'
import '../common/styles/company.css';
import Typeahead from '../common/components/typeahead';
import { getHistoricalData, searchCompany, getConsolidatedData } from './action';
import { setError } from '../common/actions/commonActions';
import ChartRender from '../components/chartRender';
import { processHistoricalData } from '../common/util';
// import ErrorBar from '../common/components/ErrorBar';

class Company extends Component {
    state = {
        // selectedCompany: {id: 1351, name: 'Hindustan Zinc Ltd'},
        selectedCompany: { id: 3365, name: 'Tata Consultancy Services Ltd', url: '/company/TCS/consolidated/' },
        historicalData: [],
        consolidatedData: [],
        duration: 1080,
        chartType: 'spline'
    };

    durationOptions = [
        {id: 30, label: '1m'},
        {id: 90, label: '3m'},
        {id: 180, label: '6m'},
        {id: 400, label: '1Yr'},
        {id: 1080, label: '3Yr'},
        {id: 1800, label: 'Max'}
    ];
    
    // chartTypes = ['line', 'spline', 'bar', 'combined'];

    componentDidMount() {
        const duration = this.state.duration;
        const companyId = this.state.selectedCompany.id;
        const url = this.state.selectedCompany.url;
        this.props.getHistoricalData({companyId, duration}, this.historicalDataCallback);
        this.props.getConsolidatedData({url}, this.consolidatedDataCallback);
    }
    
    historicalDataCallback = (data) => {
        this.setState({ historicalData: data.prices });
    }

    consolidatedDataCallback = (data) => {
        this.setState({ consolidatedData: data });
    }

    selectCompany = (selection) => {
        const selectedCompany = {...selection};
        this.setState({ selectedCompany });
        const duration = this.state.duration;
        const companyId = selection.id;
        const url = selection.url;
        this.props.getHistoricalData({companyId, duration}, this.historicalDataCallback);
        this.props.getConsolidatedData({url}, this.consolidatedDataCallback);
    }

    renderChart = () => {
        const priceData = this.state.historicalData;
        const consolidatedData = this.state.consolidatedData;
        if (priceData.length === 0) {
            return null;
        }
        const chartData = processHistoricalData(priceData, consolidatedData);
        return (
            <ChartRender chartType={this.state.chartType} processedData = {[chartData]} compareList = {[this.state.selectedCompany]}/>
        );
    }

    addToWatchlist = () => {
        const selectedCompany = this.state.selectedCompany;
        const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
        let errorMessage = null;
        if (watchlist.filter(item => item.id === selectedCompany.id).length === 0) {
            watchlist.push(selectedCompany);
            localStorage.setItem('watchlist', JSON.stringify(watchlist));
            errorMessage = 'Stock added successfully';
        } else {
            errorMessage = 'Stock already exist in the watchlist';
        }
        const error = { message: errorMessage };
        this.props.setError(error);
    }

    changeDuration = (duration) => {
        this.setState({ duration });
        const companyId = this.state.selectedCompany.id;
        this.props.getHistoricalData({companyId, duration}, this.historicalDataCallback);
    }

    renderDuration = () => {
        return (<div class="btn-group pull-left mr-2 mb-2" role="group" aria-label="Basic example">
            {this.durationOptions.map(item => {
                const customClass = this.state.duration === item.id ? 'active' : ''; 
                return (
                    <button type="button" class={`btn btn-secondary ${customClass}`} disabled={!this.state.selectedCompany} onClick={() => this.changeDuration(item.id)}>{item.label}</button>
                )
            })}
        </div>);
    }

    render = () => {
        return (
            <div id="company">
                <div className="row ml-4 mr-4 mt-5 mb-5">
                    <div className="col-md-12 col-lg-8 company-actions">
                        {this.renderDuration()}
                        {this.state.selectedCompany && <button className="btn btn-primary pull-left mb-2" onClick={this.addToWatchlist}>Add to watchlist</button>}
                    </div>
                    <div className="col-md-12 col-lg-4">
                        <Typeahead searchCompany={this.props.searchCompany} selectCompany={this.selectCompany} />
                    </div>
                </div>
                <div class="col-12">
                    {/* <button className={`btn btn-primary ${styles.testButton}`}>test button</button> */}
                    {this.renderChart()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    company: state.company
})

const mapDispatchToProps = {
    getHistoricalData,
    getConsolidatedData,
    searchCompany,
    setError
};

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(Company);

export default connectedComponent;