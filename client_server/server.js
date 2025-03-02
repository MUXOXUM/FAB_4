const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 3003;


app.get('/api/products', (req, res) => {
    const data = fs.readFileSync(path.join(__dirname, '../products.json'), 'utf-8');
    res.json(JSON.parse(data));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/client.html'));
});

app.listen(PORT, () => console.log(`[NOTE] Client server running at http://localhost:${PORT}`));
