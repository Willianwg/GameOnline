export default function createKeyboardListener(document){
    const state = {
        observers:[],
        playerId:null
    }

    function registerPlayerId(playerId){
        state.playerId = playerId;
    }
    function subscribe(observerFunction){
        state.observers.push(observerFunction);
    }

    function notifyAll(command){
        state.observers.map( observerFunction => observerFunction(command) );
    }

    document.addEventListener('keydown', handleKeyDown);

    function handleKeyDown(event){
        const command = {
            playerId:state.playerId,
            keyPressed:event.key
        }
      
        notifyAll(command);
    }

    return {
        subscribe,
        registerPlayerId
    }
}
