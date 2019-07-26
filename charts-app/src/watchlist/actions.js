import axios from 'axios';

const historicalDataApi = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&apikey=LYK5FRW7A27I9REB';


export const getWatchlistData = (watchlist, callback) => {
    return (dispatch) => {
        const promises = [];
        watchlist.forEach(element => {
            const test = axios.get(`${historicalDataApi}&symbol=NSE:${element}`);
            promises.push(test);
        });
        dispatch({ type: 'SHOW_LOADER' });
        Promise.all(promises).then(([...res]) => {
            console.log(res);
            dispatch({ type: 'HIDE_LOADER' });
            callback(res);
        });
    }
} 