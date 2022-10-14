import express from 'express';
import http from 'http';
import createGame from './public/scripts/createGame.js';
import { Server, Socket } from 'socket.io';

const app = express();
const server = http.createServer(app);
const sockets = new Server(server);

app.use(express.static('public'));

const game = createGame();

game.subscribe((command)=>{

    sockets.emit(command.type, command);
})

sockets.on('connection', (socket)=>{
    console.log(socket.id);

    const playerId = socket.id;
    game.addPlayer({ playerId });

    socket.emit('setup', game.state);

    socket.on('disconnect', ()=>{
        game.removePlayer({ playerId });
    })
})

server.listen(3333);