const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 3003;

app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/api/products', (req, res) => {
    const data = fs.readFileSync(path.join(__dirname, '../products.json'), 'utf-8');
    res.json(JSON.parse(data));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/client.html'));
});

app.use((req, res, next) => {
    console.log(`Запрос: ${req.method} ${req.url}`);
    next();
});

// Тестовый маршрут для ошибки 500
//app.get('/error', (req, res, next) => {
//    next(new Error('Тестовая ошибка 500')); // Вызываем ошибку
//});

// Обработка ошибки 404
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '../frontend/error_404.html'));
});

// Обработка ошибки 500
app.use((err, req, res, next) => {
    console.error('Ошибка 500:', err.stack); // Логируем ошибку
    res.status(500).sendFile(path.join(__dirname, '../frontend/error_500.html'));
});

app.listen(PORT, () => console.log(`[NOTE] Client server running at http://localhost:${PORT}`));

