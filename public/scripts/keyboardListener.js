export default function createKeyboardListener(document){
    const state = {
        observers:[]
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
            playerId:'player1',
            keyPressed:event.key
        }
      
        notifyAll(command);
    }

    return {
        subscribe
    }
}
