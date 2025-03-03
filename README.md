# Интернет-магазин "Кошачий рай"

### Запуск проекта

### 1. Клонируем репозиторий:
```bash
git clone <url репозитория>
```

### 2. Устанавливаем зависимости и запускаем сервера
```bash
npm install
cd ../client_server && node server.js
cd ../admin_server && node server.js
cd ../ws_server && node server.js
```

### 3. Открываем в браузере:
Клиентская часть через GraphQL: http://localhost:3003  
Админ-панель через API: http://localhost:8083  
Чат поддержки через веб-сокет: http://localhost:7073
