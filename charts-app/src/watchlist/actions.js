import axios from 'axios';

// const host = 'https://www.alphavantage.co/';
const host = 'http://localhost:3300/';

const historicalDataApi = 'query?function=TIME_SERIES_DAILY&apikey=LYK5FRW7A27I9REB';


export const getWatchlistData = (watchlist, callback) => {
    return (dispatch) => {
        const promises = [];
        watchlist.forEach(element => {
            const test = axios.get(`${host}${historicalDataApi}&symbol=NSE:${element}`);
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

export  const setCheckboxSelectionList = (CheckboxSelectionList)=>{
    return (dispatch)=> dispatch({type:'CHECKBOX_SELECTION_LIST', data : CheckboxSelectionList})
} 
export  const setCompareList = (compareList)=>{
    return (dispatch)=> dispatch({type:'COMPARE_LIST', data : compareList})
} 