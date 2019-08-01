
import axios from 'axios';

// const historicalDataApi = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&outputsize=full&apikey=LYK5FRW7A27I9REB';
// const historicalDataApi = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&apikey=LYK5FRW7A27I9REB';

// const historicalDataApi = 'https://www.screener.in/api/2/company/3365/prices/?days=30';

export const getHistoricalData = (id, callback) => {
    return (dispatch) => {
        dispatch({ type: 'SHOW_LOADER' });
        // axios.get(`${historicalDataApi}&symbol=NSE:${stock}`).then((res) => {
        axios.get(`http://localhost:3300/historicalData?id=${id}`).then((res) => {
            console.log(res.data);
            dispatch({ type: 'HIDE_LOADER' });
            callback(res.data);
        })
    }
}

export const searchCompany = (data, callback) => {
    return (dispatch) => {
        dispatch({ type: 'SHOW_LOADER' });
        axios.get(`http://localhost:3300/searchCompany?data=${data}`).then((res) => {
            console.log(res.data);
            dispatch({ type: 'HIDE_LOADER' });
            callback(res.data);
        })
    }
}


