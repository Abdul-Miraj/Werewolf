import data from './PlayerList.json';
import { ASSIGN_ROLES, ADD_PLAYER } from '../actions/actionTypes';

// returns the state of the path of the selected image
export default (state = data, action) => {
    switch (action.type) {
        case ASSIGN_ROLES:
            return action.payload;
        case ADD_PLAYER:
            return [...state, action.payload];
        default:
            return state;
    }
};
