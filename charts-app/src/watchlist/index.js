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
        watchlist2: []
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
        if( !this.state.watchlist2.length ) {
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