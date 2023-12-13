const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(bodyParser.json());

app.use(cors());

app.get('/logs.txt', (req, res) => {
    res.sendFile(__dirname + '/logs.txt')

});

app.post('/log', (req, res) => {
    const { timestamp,userAgent,ip } = req.body;
    console.log('Log request:', req.body);

    const logData = `${timestamp} - IP: ${ip}\nUser-Agent: ${userAgent}\n\n`;

    fs.appendFile('logs.txt', logData, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
            res.status(500).json({ success: false, message: 'Internal server error' });
        } else {
            res.json({ success: true, message: 'Log recorded successfully' });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
