import data from './PlayerList.json';
import { GET_PLAYERS, ADD_PLAYER, REMOVE_PLAYER, RESET_STATE, ASSIGN_ROLES, SET_DEAD } from '../actions/actionTypes';

const initalState = [];

// returns the state of the path of the selected image
export default (state = initalState, action) => {
    switch (action.type) {
        case GET_PLAYERS:
            return action.payload;
        case ADD_PLAYER:
            return [...state, action.payload];
        case REMOVE_PLAYER:
            return state.slice(0, action.payload).concat(state.slice(action.payload + 1, state.length - 1));
        case RESET_STATE:
            return [];
        case ASSIGN_ROLES:
            return action.payload;
        case SET_DEAD:
            for (let i = 0; i < state.length ; i++) {
                if (state[i].id == action.payload) {
                    state[i].isDead = true;
                }
            }
            return state;
        default:
            return state;
    }
};
