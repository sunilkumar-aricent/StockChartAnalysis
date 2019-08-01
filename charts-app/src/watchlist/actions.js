import axios from 'axios';

// const host = 'https://www.alphavantage.co/';
const host = 'http://localhost:3300/';

const historicalDataApi = 'query?function=TIME_SERIES_DAILY&apikey=LYK5FRW7A27I9REB';

export const getHistoricalData = ({companyId, duration}, callback) => {
    return (dispatch) => {
        dispatch({ type: 'SHOW_LOADER' });
        // axios.get(`${historicalDataApi}&symbol=NSE:${stock}`).then((res) => {
        axios.get(`http://localhost:3300/historicalData?companyId=${companyId}&duration=${duration}`).then((res) => {
            console.log(res.data);
            dispatch({ type: 'HIDE_LOADER' });
            callback(res.data);
        })
    }
}

export const getWatchlistData = (watchlist, callback) => {
    return (dispatch) => {
        const promises = [];
        watchlist.forEach(element => {
            const companyId = element.id;
            const duration = 30;
            const test = axios.get(`http://localhost:3300/historicalData?companyId=${companyId}&duration=${duration}`);
            // const test = axios.get(`${host}${historicalDataApi}&symbol=NSE:${element}`);
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