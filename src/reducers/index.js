import { combineReducers } from 'redux';
import navReducer from './navReducer';
import playerReducer from './playerReducer';
import nightReducer from './nightReducer';


export default combineReducers({
    nav: navReducer,
    players: playerReducer,
    night: nightReducer,
    
});
