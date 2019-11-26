import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as formReducer } from 'redux-form';
import { default as dates } from './dates';
import { default as executes } from './executes';
import { default as failedSitesCounts } from './failedSitesCounts';
import { default as manuals } from './manuals';
import { default as masterLists } from './masterLists';
import { default as notices } from './notices';
import { default as progresses } from './progresses';
import { default as schedules } from './schedules';
import { default as softwares } from './softwares';
import { default as wots } from './wots';


export const preloadedState = {};


export const rootReducer = history => combineReducers({
  router: connectRouter(history),
  form: formReducer,
  dates,
  executes,
  failedSitesCounts,
  manuals,
  masterLists,
  notices,
  progresses,
  schedules,
  softwares,
  wots,
});
