import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getWatchlistData } from './actions';

const RemoveStockBtn = styled.button`
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
        watchlistData: []
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
            return (
                <tr>
                    <td>{company}</td>
                    <td>{price}</td>
                    <td>{volume}</td>
                    <td><RemoveStockBtn className="fa fa-times" onClick={() => this.removeStock(index)}></RemoveStockBtn></td>
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
                </tr>
                {html}
            </table>
        );
    }

    render = () => (
        <div>
             This is watchlist - {this.state.watchlist.length}
            {this.renderWatchlist()}
        </div>
    )
}

const mapStateToProps = (state) => ({
    watchlist: state.watchlist
})

const mapDispatchToProps = {
    getWatchlistData
};

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(Watchlist);

export default connectedComponent;