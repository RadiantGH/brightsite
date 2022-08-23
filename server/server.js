const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, '../dist/index.html'));
});

app.use('/bundle.js', express.static(path.join(__dirname, '../dist/bundle.js')));

app.get('/api/assets/talk_typescript.mp3', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../src/assets/talk_typescript.mp3'));
})

//Error
app.use('/', (req, res) => {
    res.status(404).send('404 not found');
});

app.listen(port, () => {
    console.log('Started server listening on port: ', port);
})