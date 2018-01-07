import data from './PlayerList.json';
import { GET_PLAYERS, ADD_PLAYER, REMOVE_PLAYER } from '../actions/actionTypes';

// returns the state of the path of the selected image
export default (state = [], action) => {
    switch (action.type) {
        case GET_PLAYERS:
            return action.payload;
        case ADD_PLAYER:
            return [...state, action.payload];
        case REMOVE_PLAYER:
            return []//state.splice(action.payload, 1);
        default:
            return state;
    }
};
