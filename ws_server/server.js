// ws-server.js
const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

const clients = new Map(); // userId -> ws

wss.on("connection", (ws, req) => {
    console.log("Новый клиент подключен!");

    ws.on("message", (message) => {
        const data = JSON.parse(message);
        
        if (data.type === "init") {
            clients.set(data.userId, ws); // Сохраняем соединение
            console.log(`Пользователь ${data.userId} подключился`);
        }

        if (data.type === "message") {
            const recipient = clients.get(data.to);
            if (recipient) {
                recipient.send(JSON.stringify({ from: data.from, text: data.text }));
            }
        }
    });

    ws.on("close", () => {
        console.log("Клиент отключился");
        clients.forEach((client, key) => {
            if (client === ws) clients.delete(key);
        });
    });
});

console.log("WebSocket сервер запущен на порту 8080");
