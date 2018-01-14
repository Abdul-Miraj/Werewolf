import { ADD_DAY, UPDATE_DAY } from '../actions/actionTypes';

// returns the state of the path of the selected image
export default (state = [], action) => {
    switch (action.type) {
        case ADD_DAY:
            return [...state, action.payload];
        case UPDATE_DAY:
            return [Object.assign({}, state[state.length - 1], {
                [action.payload.id]: action.payload.value
            })];
        default:
            return state;
    }
};
