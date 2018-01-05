import { ROOM } from '../actions/actionTypes';

// returns the state of the path of the selected image
export default (state = '', action) => {
    switch (action.type) {
        case ROOM:
            return action.payload;
        default:
            return state;
    }
};
