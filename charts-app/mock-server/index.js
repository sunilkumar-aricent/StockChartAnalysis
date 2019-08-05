const express = require('express');
const fs = require('fs');
const path = require('path');
const https = require('https');
const cors = require('cors');

const app = express();
const port = process.env.port || 3300;

// const timeSeriesDailyApi = '/query?function=TIME_SERIES_DAILY&apikey=LYK5FRW7A27I9REB';
app.use(cors())

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

app.get('/consolidatedData', (req, res) => {
    const url = req.query.url;
    https.get(`https://www.screener.in/${url}`, (resp) => {
        let data = '';

        resp.on('data', (chunk) => {
            data += chunk;
        });

        resp.on('end', () => {
            res.send(data);
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
})

app.get('/searchCompany', (req, res) => {
    const data = req.query.data;
    https.get(`https://www.screener.in/api/company/search/?q=${data}`, (resp) => {
        let data = '';

        resp.on('data', (chunk) => {
            data += chunk;
        });

        resp.on('end', () => {
            res.send(JSON.parse(data));
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
})


app.get('/historicalData', (req, res) => {
    const companyId = req.query.companyId;
    const duration = req.query.duration || 356;
    https.get(`https://www.screener.in/api/2/company/${companyId}/prices/?days=${duration}`, (resp) => {
        let data = '';

        resp.on('data', (chunk) => {
            data += chunk;
        });

        resp.on('end', () => {
            res.send(JSON.parse(data));
        });

        }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
})

app.listen(port, () => {
    console.log(`mock server listening @ ${port}`);
})
