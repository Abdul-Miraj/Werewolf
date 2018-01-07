import { UPDATE_NIGHT, ADD_NIGHT, GET_NIGHT, USERNAME, ROOM, ADD_PLAYER, REMOVE_PLAYER } from './actionTypes';

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

// add a player
export const addPlayer = (player) => {
  return {
    type: ADD_PLAYER,
    payload: player  
  };
};

// remove a player
export const removePlayer = (player) => {
  return {
    type: REMOVE_PLAYER,
    payload: player  
  };
};
