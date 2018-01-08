import data from './PlayerList.json';
import { GET_PLAYERS, ADD_PLAYER, REMOVE_PLAYER, RESET_STATE } from '../actions/actionTypes';

const initalState = [];

// returns the state of the path of the selected image
export default (state = initalState, action) => {
    switch (action.type) {
        case GET_PLAYERS:
            return action.payload;
        case ADD_PLAYER:
            console.log("ADDING A PLAYER: ", action.payload)
            return [...state, action.payload];
        case REMOVE_PLAYER:
            console.log("REMOVING A PLAYER: ", state.slice(0,action.payload).concat(state.slice(action.payload + 1, state.length-1)));
            return state.slice(0,action.payload).concat(state.slice(action.payload + 1, state.length-1));
        case RESET_STATE:
            console.log("good");
            return [];
        default:
            return state;
    }
};
