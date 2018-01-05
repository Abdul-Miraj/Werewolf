import { UPDATE_NIGHT, ADD_NIGHT, GET_NIGHT, USERNAME, ROOM } from './actionTypes';

// update the night counter
export const addNight = (night) => {
    return {
      type: ADD_NIGHT,
      payload: night  
    };
};

// update the object that stores night decisions
export const updateNight = (night) => {
    return {
      type: UPDATE_NIGHT,
      payload: night  
    };
};

//
export const getNight = (night) => {
  return {
    type: GET_NIGHT,
    payload: night  
  };
};

// set the username
export const setUser = (name) => {
  return {
    type: USERNAME,
    payload: name  
  };
};

// set the room code
export const setRoom = (room) => {
  return {
    type: ROOM,
    payload: room  
  };
};