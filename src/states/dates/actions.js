import axios from 'axios';
import { DATES_URL } from '../api';


// types
const LOAD = 'DATES_LOAD';
const LOAD_ON_DATE = 'DATES_LOAD_ON_DATE';

export const types = {
  LOAD,
  LOAD_ON_DATE,
};


// creators
const load = () => async dispatch => {
  const response = await axios.get(DATES_URL);
  dispatch({
    type: LOAD,
    response,
  });
};

const loadOnDate = date => async dispatch => {
  const response = await axios.get(`${DATES_URL}?date=${date}`);
  dispatch({
    type: LOAD_ON_DATE,
    response,
  });
};


export const actions = {
  load,
  loadOnDate,
};