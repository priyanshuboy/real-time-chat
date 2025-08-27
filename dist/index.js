"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let allClients = [];
let userCount = 0;
//1. Handle new client connections
wss.on('connection', (socket) => {
    console.log('New client connected');
    userCount++;
    allClients.push(socket);
    socket.send(`Welcome! There are currently ${userCount} users connected.`);
    //2. Handle incoming messages from clients
    socket.on('message', (message) => {
        console.log(`Received message: ${message}`);
        for (let i = 0; i < allClients.length; i++) {
            if (allClients[i] !== socket) {
                allClients[i].send(`User says: ${message}`);
            }
        }
        setTimeout(() => {
            socket.send(`Server received: ${message}`);
        }, 1000);
    });
    //3. Handle client disconnection
    socket.on('close', () => {
        console.log('Client disconnected');
        userCount--;
    });
});
