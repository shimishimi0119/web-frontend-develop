import _ from 'lodash';
import { types } from './actions';
import { types as executeTypes } from '../executes';

const initialState = {
  selected: {
    execStep: '',
    id: null,
    region: '',
    workDisabled: false,
    workPath: '',
    workServer: '',
    date: null,
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD:
      return _.mapKeys(action.response.data, 'id');
    case types.GET:
    case executeTypes.INIT:
      const hasResponse = 'response' in action && 'data' in action.response;
      return hasResponse && { selected: { ...action.response.data } };
    case types.CLEAR:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
