import axios from 'axios';
import { SCHEDULES_URL } from '../api';


// types
const SUBMIT = 'FAILED_SITES_COUNT_SUBMIT';

export const types = {
  SUBMIT,
};

const submit = values => async dispatch => {
    const response = await axios.get(`${SCHEDULES_URL}/${values.scheduleId}/increment_failed_sites_count/?count=${values.value}`);
    dispatch({
      type: SUBMIT,
      response,
    });
};

export const actions = {
    submit,
};