const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.port || 3300;

// const timeSeriesDailyApi = '/query?function=TIME_SERIES_DAILY&apikey=LYK5FRW7A27I9REB';

app.get('/', (req, res) => {
    res.send('dayanand gupta')
})

app.get('/query', (req, res) => {
    // read mock json and send in response
    const symbol = req.query.symbol.split(':')[1].toLowerCase();
    console.log(req.query, req.query.symbol, symbol);
    const file = path.resolve(__dirname, 'mock-json', `${symbol}.json`)
    fs.readFile(file, (err, data) => {
        if (err) {
            res.status('500').end();
        }
        res.type('json');
        res.send(data.toString());
    });
})

app.listen(port, () => {
    console.log(`mock server listening @ ${port}`);
})
