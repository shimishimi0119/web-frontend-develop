import axios from 'axios';
import { WOTS_URL } from '../api';
import { types as noticeTypes } from '../notices';
// types
const WOTS_GET = 'WOTS_GET'
const WOTS_OPEN = 'WOTS_OPEN';
const WOTS_CLOSE = 'WOTS_CLOSE';
const WOTS_CREATE = 'WOTS_CREATE';
const WOTS_DELETE = 'WOTS_DELETE';
// const WOTS_NOTICE = 'WOTS_NOTICE';

export const types = {
  WOTS_GET,
  WOTS_OPEN,
  WOTS_CLOSE,
  WOTS_CREATE,
  WOTS_DELETE,
  // WOTS_NOTICE,
};

// creators
const getWot = id => async dispatch => {
  let response = null;
  try {
    response = await axios.get(`${WOTS_URL}/${id}/`);
  } catch (e) {
    response = e.response;
  } finally {
    console.log(response);
    dispatch({
      type: WOTS_GET,
      response,
    });
  }
  return response.data;
};

const openWot = (id, wotId) => async dispatch => {
  const response = await axios.put(`${WOTS_URL}/${id}/wot_open/`, { schedule: id, wotId });
  dispatch({
    type: WOTS_OPEN,
    response,
  });
  return response.data;
};

const closeWot = (id, wotId) => async dispatch => {
  const response = await axios.put(`${WOTS_URL}/${id}/wot_close/`, { schedule: id, wotId });
  dispatch({
    type: WOTS_CLOSE,
    response,
  });
  return response.data;
};

const createWot = (id, wotId) => async dispatch => {
  const response = await axios.post(`${WOTS_URL}/`, { schedule: id, wotId });
  dispatch({
    type: WOTS_CREATE,
    response,
  });
};

const deleteWot = (id) => async dispatch => {
  let response = null;
  try {
    response = await axios.delete(`${WOTS_URL}/${id}/`);
  } catch (e) {
    response = e.response;
  } finally {
    dispatch({
      type: WOTS_DELETE,
      response,
    });
  }
  return response;
};

const showNotice = (actionValueMap) => async dispatch => {
  if (typeof (actionValueMap.message) === 'object') {
    actionValueMap.message = JSON.stringify(actionValueMap.message);
  }
  dispatch({ type: noticeTypes.OPEN, ...actionValueMap });
};

export const actions = {
  getWot,
  openWot,
  closeWot,
  createWot,
  deleteWot,
  showNotice,
};