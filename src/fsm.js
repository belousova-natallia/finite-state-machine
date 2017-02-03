class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        
        if(!config) throw new Error("нет config");
        else {(this.config = config);
        this.currentState = this.config.initial;
        this.arrStates = [this.currentState];
        this.bufferForUndoRedo = [];

    }
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.currentState;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {

        if(state in this.config.states ) {
           
             this.currentState = state;
             this.arrStates.push(this.currentState);
             this.bufferForUndoRedo = [];
         }
         else throw new Error;

    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if(event in this.config.states[this.currentState].transitions){
            
    this.currentState = this.config.states[this.currentState].transitions[event];
     this.arrStates.push(this.currentState);
     this.bufferForUndoRedo = [];
}
    else throw new Error;

    }

    /**
     * Resets FSM state to initial.
     */
    reset() {

     this.currentState = this.config.initial;   
      this.arrStates = [this.currentState];
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        if (!event){

            var arr = [];
            for (var key in this.config.states){
                arr.push(key)
            }
            return arr;
        }

        var arr = [];
        for (var key in this.config.states){

            for (var k in this.config.states[key].transitions){
                if (k === event) arr.push(key)
            }
        }
        return arr;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if(this.arrStates.length > 1){
          this.bufferForUndoRedo.push(this.arrStates.pop());
        this.currentState = this.arrStates[this.arrStates.length - 1];
        
         return true;
     }
         return false;
            }
        

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if(this.bufferForUndoRedo.length){
            this.arrStates.push(this.bufferForUndoRedo.pop());
            this.currentState = this.arrStates[this.arrStates.length - 1];
            return true;
        }
        return false;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.arrStates = [this.currentState];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
