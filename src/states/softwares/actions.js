import axios from 'axios';
import { SOFTWARES_URL } from '../api';


// types
const LOAD = 'SOFTWARES_LOAD';
const SUBMIT = 'NEW_SOFTWARE_SUBMIT';
const SUBMIT_ERROR = 'NEW_SOFTWARE_SUBMIT_ERROR';

export const types = {
  LOAD,
  SUBMIT,
  SUBMIT_ERROR,
};

const submit_url = `${SOFTWARES_URL}/`;

// creators
const load = () => async dispatch => {
  const response = await axios.get(SOFTWARES_URL);
  dispatch({
    type: LOAD,
    response,
  });
};

const submit = values => {
  const params = transformData(values);
  // responseの中身をチェックする
  return async (dispatch) => {
    let actionValueMap = {};

    try {
      const response = await axios.post(submit_url, params);

      if (response.status === 201) {
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
          message: `送信失敗しました。`,
        };

        dispatch({
          type: SUBMIT_ERROR,
          ...actionValueMap
        });

      }

    } catch(e) {

      actionValueMap = {
        level: 'error',
        message: `エラー:${e}`,
      };
      
      dispatch({
        type: SUBMIT_ERROR,
        ...actionValueMap
      });

    }
  }
};

// Formの形式からAPIの形式に変換
const transformData = values => {
  let params = {};

  params.packageName = values.packageName;

  // WのNewSWがある場合はW、それ以外はL
  values.wNewSW ? params.nodeType = 'W' : params.nodeType = 'L';

  // APIに合う形に変える
  let actSwList = [];
  let passiveSwList = [];
  let sharedActSwList = [];
  if(params.nodeType === 'W') {
    params.version = values.wNewSW;
    values.wActiveSW1 && actSwList.push(values.wActiveSW1);
    values.wActiveSW2 && actSwList.push(values.wActiveSW2);
    values.wActiveSW3 && actSwList.push(values.wActiveSW3);
    values.wPassiveSW1 && passiveSwList.push(values.wPassiveSW1);
    values.wPassiveSW2 && passiveSwList.push(values.wPassiveSW2);
    values.wPassiveSW3 && passiveSwList.push(values.wPassiveSW3);
    values.lActiveSW1 && sharedActSwList.push(values.lActiveSW1);
    values.lActiveSW2 && sharedActSwList.push(values.lActiveSW2);
    values.lActiveSW3 && sharedActSwList.push(values.lActiveSW3);
  } else {
    params.version = values.lNewSW;
    values.lActiveSW1 && actSwList.push(values.lActiveSW1);
    values.lActiveSW2 && actSwList.push(values.lActiveSW2);
    values.lActiveSW3 && actSwList.push(values.lActiveSW3);
    values.lPassiveSW1 && passiveSwList.push(values.lPassiveSW1);
    values.lPassiveSW2 && passiveSwList.push(values.lPassiveSW2);
    values.lPassiveSW3 && passiveSwList.push(values.lPassiveSW3);
    values.wActiveSW1 && sharedActSwList.push(values.wActiveSW1);
    values.wActiveSW2 && sharedActSwList.push(values.wActiveSW2);
    values.wActiveSW3 && sharedActSwList.push(values.wActiveSW3);
  }
  params.activeVersions = actSwList;
  params.passiveVersions = passiveSwList;
  params.sharedActiveVersions = sharedActSwList;

  return params;
}

export const actions = {
  load,
  submit,
};