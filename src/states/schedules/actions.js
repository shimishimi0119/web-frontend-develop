import axios from 'axios';
import { SCHEDULES_URL } from '../api';

// types
const LOAD = 'SCHEDULES_LOAD';
const GET = 'SCHEDULES_GET';
const CLEAR = 'SCHEDULES_CLEAR';

export const types = {
  LOAD,
  GET,
  CLEAR,
};


// creators
const load = () => async dispatch => {
  const response = await axios.get(SCHEDULES_URL);
  dispatch({
    type: LOAD,
    response,
  });
};

const get = id => async dispatch => {
  const response = await axios.get(`${SCHEDULES_URL}/${id}/`);
  dispatch({
    type: GET,
    response,
  });
};

const clear = () => dispatch => {
  dispatch({ type: CLEAR });
}

export const actions = {
  load,
  get,
  clear,
};