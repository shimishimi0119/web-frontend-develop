import axios from 'axios';
import { MANUAL_TOOL_EXEC_URL } from '../api';


// types
const SUBMIT = 'MANUAL_TOOL_EXEC';
const EXECUTION = 'EXECUTION';

export const types = {
  SUBMIT,
  EXECUTION,
};

// creators
const submit = values => async dispatch => {
  try {
    
    // ↓ debug用 => 後で消す
    // dispatch({
    //   type: EXECUTION,
    //   status: '実行中',
    //   level: 'success',
    //   message: '処理が完了しました'
    // });
    // ↑ debug用 => 後で消す

    const response = await axios.post(MANUAL_TOOL_EXEC_URL, values);
    dispatch({
      type: SUBMIT,
      response,
    });

  } catch (e) {

  } finally {

  }
};

export const actions = {
  submit,
};