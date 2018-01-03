import { UPDATE_NIGHT, ADD_NIGHT, GET_NIGHT } from './actionTypes';

export const addNight = (night) => {
    return {
      type: ADD_NIGHT,
      payload: night  
    };
};

export const updateNight = (night) => {
    return {
      type: UPDATE_NIGHT,
      payload: night  
    };
};

export const getNight = (night) => {
  return {
    type: GET_NIGHT,
    payload: night  
  };
};