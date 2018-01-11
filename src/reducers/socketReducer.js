import { SET_SOCKET } from '../actions/actionTypes';

// returns the state of the path of the selected image
export default (state = '', action) => {
    switch (action.type) {
        case SET_SOCKET:
            return action.payload;
        default:
            return state;
    }
};
