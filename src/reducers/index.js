import { combineReducers } from 'redux';
import navReducer from './navReducer';
import playerReducer from './playerReducer';
import nightReducer from './nightReducer';
import { reducer as formReducer } from 'redux-form';
import userReducer from './userReducer';
import roomReducer from './roomReducer';
import socketReducer from './socketReducer';

export default combineReducers({
    nav: navReducer,
    players: playerReducer,
    night: nightReducer,
    form: formReducer,
    id: userReducer,
    room: roomReducer,
    socket: socketReducer
});
