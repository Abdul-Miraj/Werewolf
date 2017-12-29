import { combineReducers } from 'redux';
import navReducer from './navReducer';
import playerReducer from './playerReducer';

export default combineReducers({
    nav: navReducer,
    players: playerReducer
});
