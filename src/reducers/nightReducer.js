import { NIGHT } from '../actions/actionTypes';

// returns the state of the path of the selected image
export default (state = {}, action) => {
    switch (action.type) {
        case NIGHT:
            return action.payload;
        default:
            return state;
    }
};