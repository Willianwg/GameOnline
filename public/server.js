import express from 'express';
import http from 'http';
import createGame from './scripts/createGame.js';

const app = express();

const server = http.createServer(app);
app.use(express.static('public'));

const game = createGame();
game.addPlayer({ playerId:'player1', playerX:4, playerY:8});
game.addFruit({ fruitId:'fruit1', fruitX:12, fruitY:16});

server.listen(3000);