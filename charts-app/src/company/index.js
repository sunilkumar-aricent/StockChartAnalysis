import React, { Component} from 'react';
import { connect } from 'react-redux';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import '../common/styles/company.css';
import Typeahead from '../common/components/typeahead';
import { getHistoricalData, searchCompany } from './action';
import ChartRender from '../components/chartRender';
import { processHistoricalData } from '../common/util';

class Company extends Component {
    state = { selectedCompany: {id: 1351, name: 'Hindustan Zinc Ltd'}, historicalData: [], duration: 360, chartType: 'spline'
};

    durationOptions = [30, 90, 360, 1080, 1800];
    chartTypes = ['line', 'spline', 'bar', 'combined'];

    
    componentDidMount() {
        const companyId = this.state.selectedCompany.id;
        const duration = this.state.duration;
        this.props.getHistoricalData({companyId, duration}, this.historicalDataCallback);
    }
    
    historicalDataCallback = (data) => {
        this.setState({ historicalData: data });
    }

    selectCompany = (selection) => {
        this.setState({ selectedCompany: { name: selection.name, id: selection.id }});
        const companyId = selection.id;
        const duration = this.state.duration;
        this.props.getHistoricalData({companyId, duration}, this.historicalDataCallback);
    }

    renderHistoricalData = () => {
        const data = this.state.historicalData;
        if (data.length === 0) {
            return null;
        }
        const processedData = processHistoricalData(data.prices);
        return (
            <ChartRender chartType={this.state.chartType} processedData = {[processedData]} compareList = {[this.state.selectedCompany]}/>
        );
    }

    addToWatchlist = () => {
        const selectedCompany = { id: this.state.selectedCompany.id, name:  this.state.selectedCompany.name };
        const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
        if (watchlist.filter(item => item.id === selectedCompany.id).length === 0) {
            watchlist.push(selectedCompany);
            localStorage.setItem('watchlist', JSON.stringify(watchlist));
            alert('stock added successfully');
        } else {
            alert('stock already exist in the watchlist');
        }
    }

    changeDuration = (duration) => {
        this.setState({ duration });
        const companyId = this.state.selectedCompany.id;
        this.props.getHistoricalData({companyId, duration}, this.historicalDataCallback);
    }

    renderDuration = () => {
        return (<div class="btn-group pull-left ml-5" role="group" aria-label="Basic example">
            {this.durationOptions.map(item => {
                const customClass = this.state.duration === item ? 'active' : ''; 
                return (
                    <button type="button" class={`btn btn-secondary ${customClass}`} disabled={!this.state.selectedCompany} onClick={() => this.changeDuration(item)}>{item}</button>
                )
            })}
        </div>);
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

    render = () => {
        return (
            <div id="company">
                <div className="row mb-5 mt-5">
                    <div className="col-12 col-sm-8 company-actions">
                        {/* <h3>{!this.state.selectedCompany ? 'Please select a company to continue' : `${this.state.selectedCompany.name}`}</h3> */}
                        {this.renderDuration()}
                        <div class="pull-left ml-2">
                            {this.renderChartType()}
                        </div>
                        {this.state.selectedCompany && <button className="btn btn-primary pull-left ml-2" onClick={this.addToWatchlist}>Add to watchlist</button>}
                    </div>
                    <div className="col-12 col-sm-4">
                        <Typeahead searchCompany={this.props.searchCompany} selectCompany={this.selectCompany} />
                    </div>
                </div>
                <div class="col-12">
                    {/* <button className={`btn btn-primary ${styles.testButton}`}>test button</button> */}
                    {this.renderHistoricalData()}
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
    searchCompany
};

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(Company);

export default connectedComponent;