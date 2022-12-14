export default function createGame(){
    const state = {
        players:{},
        fruits:{},
        screen:{
            width:20,
            height:20
        }
    }

    const observers = [];

    function subscribe(observerFunction){
        observers.push(observerFunction);
    }

    function notifyAll(command){
        observers.map( observerFunction => observerFunction(command) );
    }

    function setState(newState){
        Object.assign(state, newState);
    }

    function addPlayer(command){
        const playerId = command.playerId;
        const playerX = command.playerX? command.playerX : Math.floor(Math.random() * state.screen.width);
        const playerY = command.playerY? command.playerY : Math.floor(Math.random()* state.screen.height);

        state.players[playerId] = { x:playerX, y:playerY };

        notifyAll({
            type:'addPlayer',
            playerId,
            playerX,
            playerY
        });
    }

    function removePlayer(command){
        const playerId = command.playerId;
        delete state.players[playerId]

        notifyAll({
            type:'removePlayer',
            playerId
        });
    }
    
    function movePlayer(command){
        notifyAll(command);
        const { playerId, keyPressed } = command;
        const player = state.players[playerId];

        const moves = {
            ArrowUp:()=> player.y>0 ? player.y-=1:false,
            ArrowDown:()=> player.y<state.screen.height-1 ? player.y+=1 :false,
            ArrowLeft:()=> player.x>0 ? player.x-=1:false,
            ArrowRight:()=> player.x<state.screen.width-1? player.x+=1 :false,
        }

        const moveFunction = moves[keyPressed];

        if( player && moveFunction){
            moveFunction();
            checkFruitCollision(player);
        }

    }

    function addFruit(command){
        const fruitId = command.fruitId;
        const fruitX = command.fruitX;
        const fruitY = command.fruitY;

        state.fruits[fruitId] = { x:fruitX, y:fruitY };
    }

    function removeFruit(command){
        const fruitId = command.fruitId;
        delete state.fruits[fruitId]
    }

    function checkFruitCollision (player){
            for(const fruitId in state.fruits){
                const fruit = state.fruits[fruitId];

                if( player.x === fruit.x && player.y === fruit.y){
                    console.log('bateu');
                    removeFruit({ fruitId })
                }
            }
    }
    return {
        addPlayer,
        removePlayer,
        addFruit,
        removeFruit,
        movePlayer,
        setState,
        subscribe,
        state
    }
}