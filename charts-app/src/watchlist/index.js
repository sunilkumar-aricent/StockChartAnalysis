import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getWatchlistData, setCompareList, setCheckboxSelectionList } from './actions';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import '../common/styles/watchlist.css';


const RemoveStockBtn = styled.button`
    font-size: 10px,
    color: #fa3,
    cursor: pointer
`;

const CompareStockBtn = styled.button`
    font-size: 10px,
    color: #fa3,
    cursor: pointer
`;

const updateLocalStorage = (item, data) => {
    localStorage.setItem(item, JSON.stringify(data));
}

class Watchlist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            watchlist: JSON.parse(localStorage.getItem('watchlist')) || [],
            watchlistData: [],
            checkboxSelectionList: this.getCheckboxSelectionList()
        }
    }

    getCheckboxSelectionList = () => {
        const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
        const selectedIds = this.props.common.compareList.map(item => item.id);
        const checkboxSelectionList = watchlist.map(item => {
            if(selectedIds.indexOf(item.id) !== -1) {
                return true;
            } else {
                return false;
            }
        })
        return checkboxSelectionList;
    }

    componentDidMount() {
        // make api call to get data for each item in watchlist
        this.props.getWatchlistData(this.state.watchlist, (watchlist) => {
            console.log(watchlist);
            const watchlistData = [];
            watchlist.forEach((element, index) => {
                const price = element.data.prices[0][1];
                const volume = element.data.prices[0][3];
                watchlistData.push({ price, volume });
            });
            this.setState({ watchlistData });
        });
    }

    handleCheckboxChange(index, event) {
        const checkboxSelectionList = [...this.state.checkboxSelectionList]
        checkboxSelectionList[index] = event.target.checked;
        this.setState({ checkboxSelectionList })
    }

    removeStock(index) {
        const watchlist = [...this.state.watchlist];
        const watchlistData = [...this.state.watchlistData];
        watchlist.splice(index, 1);
        watchlistData.splice(index, 1);
        updateLocalStorage('watchlist', watchlist);
        this.setState({ watchlist, watchlistData })
    }

    renderWatchlist() {
        if( !this.state.watchlistData.length ) {
            return null;
        }
        // const watchlist = this.state.watchlist;
        const html = this.state.watchlistData.map((item, index) => {
            // const company = item.company;
            const company = this.state.watchlist[index].name;
            const price = item.price;
            const volume = item.volume;
            const checked = this.state.checkboxSelectionList[index];
            return (
                <tr>
                    <td>{company}</td>
                    <td>{price}</td>
                    <td>{volume}</td>
                    <td><RemoveStockBtn className="fa fa-times" onClick={() => this.removeStock(index)}></RemoveStockBtn></td>
                    <td>
                        <Form.Check type='checkbox' checked={checked} onChange={(event) => this.handleCheckboxChange(index, event)} />
                    </td>
                </tr>
            );
        });
        return (
            <table className="table table-stripped">
                <tr>
                    <th>Company</th>
                    <th>Price</th>
                    <th>Volume</th>
                    <th>Remove</th>
                    <th>Select to compare</th>
                </tr>
                {html}
            </table>
        );
    }

    compareStock() {
        const selectedStocks = [];
        this.state.checkboxSelectionList.forEach((item, index) => {
            if (item) {
                selectedStocks.push(this.state.watchlist[index]);
            }
        });
        this.props.setCompareList(selectedStocks);
    }

    // compareStock() {
    //     const selectedStocks = this.state.checkboxSelectionList.filter((item, index) => {
    //         if (item) {
    //             return this.state.watchlist[index];
    //         }
    //         else
    //             return false;
    //     });
    //     this.props.setCompareList(selectedStocks);
    // }

    render = () => (
        <div>
            <h4>
                <span>Watchlist</span>
                <span>&nbsp;({(this.state.watchlist.length)} stocks)</span>
            </h4>
            <Link to={{pathname: `/comparision`}}>
                <CompareStockBtn className="pull-right btn btn-primary" onClick={() => this.compareStock()}>Compare</CompareStockBtn>
            </Link>
            {this.renderWatchlist()}
        </div>
    )
}

const mapStateToProps = (state) => ({
    watchlist: state.watchlist,
    common: state.common

})

const mapDispatchToProps = {
    getWatchlistData,
    setCompareList,
    // setCheckboxSelectionList,
};

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(Watchlist);

export default connectedComponent;