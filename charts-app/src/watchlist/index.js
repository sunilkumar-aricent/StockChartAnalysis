import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getWatchlistData, setCompareList, setCheckboxSelectionList } from './actions';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';


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
    state = {
        watchlist: JSON.parse(localStorage.getItem('watchlist')) || [],
        watchlist2: [],
    }

    //     handleCheckboxChange(index,event) {
    //     const compareList = [];
    //     event.target.checked === true ? compareList.push(this.state.watchlist[index]): compareList.splice(compareList.indexOf(this.state.watchlist[index]),1)
    //     console.log(compareList)
    //     this.props.setCompareList(compareList);
    //   }

    handleCheckboxChange(index, event) {
        // const compareList = [];
        // event.target.checked === true ? compareList.push(this.state.watchlist[index]): compareList.splice(compareList.indexOf(this.state.watchlist[index]),1)
        const checkboxSelection = [...this.props.watchlist.checkboxSelectionList]
        checkboxSelection[index] = event.target.checked;
        this.props.setCheckboxSelectionList(checkboxSelection);

        // console.log(compareList)
        // this.props.setCompareList(compareList);
    }

    componentDidMount() {
        // make api call to get data for each item in watchlist
        this.props.getWatchlistData(this.state.watchlist, (watchlistData) => {
            console.log(watchlistData);
            const watchlist2 = [];
            watchlistData.forEach((element, index) => {
                console.log(element);
                // const keys = Object.keys(element.data['Time Series (Daily)']);
                const values = Object.values(element.data['Time Series (Daily)']);
                const price = values[0]['4. close'];
                const volume = values[0]['5. volume'];
                watchlist2.push({ price, volume });
            });
            this.setState({ watchlist2 });
        });
    }

    removeStock(index) {
        const watchlist = [...this.state.watchlist];
        const watchlist2 = [...this.state.watchlist2];
        watchlist.splice(index, 1);
        watchlist2.splice(index, 1);
        updateLocalStorage('watchlist', watchlist);
        this.setState({ watchlist, watchlist2 })
    }

    renderWatchlist() {
        if (!this.state.watchlist2.length) {
            return null;
        }
        // const watchlist = this.state.watchlist;
        const html = this.state.watchlist2.map((item, index) => {
            const company = this.state.watchlist[index];
            const price = item.price;
            const volume = item.volume;
            return (
                <tr>
                    <td>{company}</td>
                    <td>{price}</td>
                    <td>{volume}</td>
                    <td><RemoveStockBtn className="fa fa-times" onClick={() => this.removeStock(index)}></RemoveStockBtn></td>
                    <td>
                        <Form.Check type='checkbox' id={`checkbox${index}`} checked={this.props.watchlist.checkboxSelectionList[index]} onChange={(event) => this.handleCheckboxChange(index, event)} />
                        <label for={`checkbox${index}`}>Check to compare</label>
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
                    <th>Check to compare</th>
                </tr>
                {html}
            </table>
        );
    }

    compareStock() {
        const selectedStocks = this.props.watchlist.checkboxSelectionList.map((item, index) => {
            if (item) {
                return this.state.watchlist[index];
            }
            else
                return false
        });
        this.props.setCompareList(selectedStocks);
    }

    render = () => (
        <div>
            This is watchlist - {this.state.watchlist.length}
            <Link to={{
                pathname: `/comparision`,
            }}><CompareStockBtn className="pull-right" onClick={() => this.compareStock()}>Compare</CompareStockBtn></Link>
            {this.renderWatchlist()}
        </div>
    )
}

const mapStateToProps = (state) => ({
    watchlist: state.watchlist,

})

const mapDispatchToProps = {
    getWatchlistData,
    setCompareList,
    setCheckboxSelectionList,
};

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(Watchlist);

export default connectedComponent;