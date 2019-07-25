
import axios from 'axios';

const historicalDataApi = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&outputsize=full&apikey=LYK5FRW7A27I9REB';

export const getHistoricalData = (stock, callback) => {
    return (dispatch) => {
        dispatch({ type: 'SHOW_LOADER' });
        axios.get(`${historicalDataApi}&symbol=NSE:${stock}`).then((res) => {
            console.log(res.data);
            // this.setState({ historicalData: res.data });
            dispatch({ type: 'HIDE_LOADER' });
            callback(res.data);
        })
    }
}

