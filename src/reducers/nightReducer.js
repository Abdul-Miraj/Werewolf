import { ADD_NIGHT, UPDATE_NIGHT } from '../actions/actionTypes';

// returns the state of the path of the selected image
export default (state = [], action) => {
    switch (action.type) {
        case ADD_NIGHT:
            return [...state, action.payload];
        case UPDATE_NIGHT:
            return Object.assign({}, state[state.length - 1], {
                [action.payload.role]: action.payload.value
            })
        default:
            return state;
    }
};
