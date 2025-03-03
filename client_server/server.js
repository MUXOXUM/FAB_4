require('dotenv').config({ path: '../.env' });
const clientPort = parseInt(process.env.CLIENT_PORT, 10);

if (isNaN(clientPort)) {
    console.error("CLIENT_PORT должен быть числом. Проверьте ваш .env файл.");
    process.exit(1); // Завершаем процесс с ошибкой
}

const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

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

app.listen(clientPort, () => console.log(`[NOTE] Client сервер запущен на http://localhost:${clientPort}`));

