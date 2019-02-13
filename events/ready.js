const express = require('express');
const SocketServer = require('ws').Server;
const path = require('path');
module.exports = async (bot) => {
    console.log("Bot ready");
    bot.user.setActivity(`%help`)

    const PORT = process.env.PORT || 3000;
    const INDEX = path.join(__dirname, 'index.html');

    const server = express()
        .use((req, res) => res.sendFile(INDEX) )
        .listen(PORT, () => console.log(`Listening on ${ PORT }`));

    const wss = new SocketServer({ server });

    wss.on('connection', (ws) => {
        console.log('Client connected');
        ws.on('close', () => console.log('Client disconnected'));
    });

    setInterval(() => {
        wss.clients.forEach((client) => {
            client.send(new Date().toTimeString());
        });
    }, 1000);
};
