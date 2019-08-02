import axios from 'axios';

// const host = 'https://www.alphavantage.co/';
const host = 'http://localhost:3300/';

const historicalDataApi = 'query?function=TIME_SERIES_DAILY&apikey=LYK5FRW7A27I9REB';


// export const getComparisionListData = (compareList, callback) => {
//     return (dispatch) => {
//         const promises = [];

//         compareList.forEach(element => {
//             const test = axios.get(`${host}${historicalDataApi}&symbol=NSE:${element}`);
//             promises.push(test);
//         });
//         dispatch({ type: 'SHOW_LOADER' });
//         Promise.all(promises).then(([...res]) => {
//             console.log(res);
//             dispatch({ type: 'HIDE_LOADER' });
//             callback(res);
//         });
//     }
// }

export const getComparisionListData = (watchlist = [], callback) => {
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
