import data from './PlayerList.json';
import { ASSIGN_ROLES } from '../actions/actionTypes';

// returns the state of the path of the selected image
export default (state = data, action) => {
    switch (action.type) {
        case ASSIGN_ROLES:
            return action.payload;
        default:
            return state;
    }
};
