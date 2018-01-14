import { UPDATE_NIGHT, ADD_NIGHT, GET_NIGHT, ID, ROOM, ADD_PLAYER, REMOVE_PLAYER, RESET_STATE, ASSIGN_ROLES, SET_SOCKET, UPDATE_DAY, SET_DEAD, ADD_DAY } from './actionTypes';

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

// set the id
export const setUser = (name) => {
  return {
    type: ID,
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
export const removePlayer = (index) => {
  return {
    type: REMOVE_PLAYER,
    payload: index
  };
};

export const resetState = () => {
  return {
    type: RESET_STATE
  }
};

export const assignRoles = (index) => {
  return {
    type: ASSIGN_ROLES,
    payload: index
  }
};

// add socket
export const setSocket = (socket) => {
  return {
    type: SET_SOCKET,
    payload: socket
  };
};

export const setDead = (id) => {
  return {
    type: SET_DEAD,
    payload: id
  };
};

export const addDay = (day) => {
  return {
    type: ADD_DAY,
    payload: day
  };
};

// update the object that stores Day decisions
export const updateDay = (day) => {
  return {
    type: UPDATE_DAY,
    payload: day
  };
};