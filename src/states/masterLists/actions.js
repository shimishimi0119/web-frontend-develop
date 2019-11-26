import axios from 'axios';
import { MASTER_LISTS_URL } from '../api';


// types
const SUBMIT = 'MASTER_LISTS_SUBMIT';
const CLEAR = 'MASTER_LISTS_STATE_CLEAR'

export const types = {
  SUBMIT,
  CLEAR,
};


// preparations for creators
const renderFormData = values => {
  const formData = new FormData();
  formData.append('software', values.software);
  formData.append('file', values.file);
  return formData;
};

const config = {
  headers: {
    'content-type': 'multipart/form-data',
  },
};

const url = `${MASTER_LISTS_URL}/import`;

// creators

const submit = values => {

  return async (dispatch) => {
    let actionValueMap = {};

    try {

      const response = await axios.post(url, renderFormData(values), config);

      if (response.status === 200) {

        actionValueMap = {
          level: 'success',
          message: '送信完了しました。',
          response: response,
        };

        dispatch({
          type: SUBMIT,
          ...actionValueMap,
        });

      } else {

        actionValueMap = {
          level: 'warning',
          message: `送信失敗しました。(${JSON.stringify(config)})`,
          response: response,
        };

        dispatch({
          type: SUBMIT,
          ...actionValueMap
        });

      }

    } catch(e) {

      actionValueMap = {
        level: 'error',
        message: `ネットワークエラー:${e}`,
        response: { status : 'error' },
      };
      
      dispatch({
        type: SUBMIT,
        ...actionValueMap
      });

    }
  };
};

const clear = () => {
  return async (dispatch) => {
    dispatch({
      type: CLEAR,
    });
  }
}

export const actions = {
  submit,
  clear,
};