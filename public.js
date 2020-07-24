const express = require('express');
const app = express();


app.get('/info', (req, res) => {
    res.sendFile('./public/info.html', {root: __dirname});
});

app.get('/error', (req, res) => {
    res.sendFile('./public/error.html', { root: __dirname });
});