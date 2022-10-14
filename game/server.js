import express from 'express';
import http from 'http';
import createGame from './public/scripts/createGame.js';
import { Server, Socket } from 'socket.io';

const app = express();
const server = http.createServer(app);
const sockets = new Server(server);

app.use(express.static('public'));

const game = createGame();
game.addPlayer({ playerId:'player1', playerX:4, playerY:8});
game.addFruit({ fruitId:'fruit1', fruitX:12, fruitY:16});

sockets.on('connection', (socket)=>{
    console.log('did it!');
})

server.listen(3333);