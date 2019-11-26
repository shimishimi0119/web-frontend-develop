import axios from 'axios';
import { SCHEDULES_URL, TOOL_EXEC_URL } from '../api';


// types
const INIT = 'EXECUTES_INIT';
const DO_EXECUTE = 'EXECUTES_DO_EXECUTE';
const PAUSE = 'EXECUTES_PAUSE';

export const types = {
  INIT,
  DO_EXECUTE,
  PAUSE,
};


// creators
const init = (values, ownProps) => {
  return async (dispatch, getState) => {
    let actionValueMap = {};
    const queryData = {
      params: {
        schedule_id: values.scheduleId,
        failed_sites_count: values.failedSitesCount,
      },
    };

    try {

      const responseExecute = await axios.get(TOOL_EXEC_URL, queryData);
      const responseGetSchedule = await axios.get(`${SCHEDULES_URL}/${values.scheduleId}/`);

      // if (responseExecute.status === 200 && responseGetSchedule === 200) {
      if (responseGetSchedule.status === 200 && responseExecute.status === 200) {
        actionValueMap = {
          level: 'success',
          message: 'ログイン完了しました。',
          response: responseGetSchedule,
        };
        // schedules.selected.scheduleId 更新用 dispatch
        dispatch({ type: INIT, ...actionValueMap });
        // Main画面へ遷移
        ownProps.history.push('/');

      } else {

        actionValueMap = {
          level: 'warning',
          message: `リクエストの内容が不正です。(${JSON.stringify(queryData)})`,
        };
        dispatch({ type: INIT, ...actionValueMap });
      }

    } catch (e) {

      actionValueMap = {
        level: 'error',
        message: `ネットワークエラー：${e}`,
      };
      dispatch({ type: INIT, ...actionValueMap });

    }
  };
};


const doExecute = (values, ownProps) => {

  const nextStep = {
    PRE_WAIT: 'PRE',
    MAIN_WAIT: 'MAIN',
    PRE_PAUSED: 'PRE',
    MAIN: 'MAIN_PAUSED',
    MAIN_PAUSED: ('force' in values && values.force === true) ? 'POST' : 'MAIN',
    POST_WAIT: 'POST',
    POST_PAUSED: 'POST',
  };

  const queryData = {
    params: {
      schedule_id: values.scheduleId,
      exec_step_next: ('execStep' in values) ? nextStep[values.execStep] : 'FINISH',
      batch: ('batch' in values) ? values.batch : null,
      force: ('force' in values) ? values.force : false,
    },
  };

  return async (dispatch, getState) => {
    let actionValueMap = {};
    // const stepValues = {
    //   PRE: '事前ヘルスチェック',
    //   MAIN: 'メイン作業',
    //   POST: '事後ヘルスチェック',
    // };

    try {

      const response = await axios.get(TOOL_EXEC_URL, queryData);

      if (response.status === 200) {
        actionValueMap = {
          level: 'success',
          message: `実行しました。`,
          // message: `${stepValues[values.execStep]}を実行しました。`,
          response,
        };
        dispatch({ type: DO_EXECUTE, ...actionValueMap });

      } else {

        actionValueMap = {
          level: 'warning',
          message: `リクエストの内容が不正です。(${JSON.stringify(queryData)})`,
        };
        dispatch({ type: DO_EXECUTE, ...actionValueMap });
      }

    } catch (e) {

      actionValueMap = {
        level: 'error',
        message: `ネットワークエラー：${e}`,
      };
      dispatch({ type: DO_EXECUTE, ...actionValueMap });

    }
  };
};


const pause = (values, ownProps) => {

  const exec_step_next_param = values.execStep + '_PAUSED';

  const queryData = {
    params: {
      schedule_id: values.scheduleId,
      exec_step_next: exec_step_next_param,
    },
  };

  return async (dispatch, getState) => {
    let actionValueMap = {};

    try {

      const response = await axios.get(TOOL_EXEC_URL, queryData);

      if (response.status === 200) {
        actionValueMap = {
          level: 'success',
          message: '作業の一時停止を受け付けました。',
          response,
        };
        dispatch({ type: PAUSE, ...actionValueMap });

      } else {

        actionValueMap = {
          level: 'warning',
          message: `リクエストの内容が不正です。(${JSON.stringify(queryData)})`,
        };
        dispatch({ type: PAUSE, ...actionValueMap });
      }

    } catch (e) {

      actionValueMap = {
        level: 'error',
        message: `ネットワークエラー：${e}`,
      };
      dispatch({ type: PAUSE, ...actionValueMap });

    }
  };
};


export const actions = {
  init,
  doExecute,
  pause,
};
