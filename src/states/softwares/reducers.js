import _ from 'lodash';
import { types } from './actions';


const reducer = (state = {}, action) => {
  switch (action.type) {
    case types.LOAD:
      return _.mapKeys(action.response.data, 'id');
    case types.SUBMIT:
      return {
        ...state,
        [action.response.data.id]: action.response.data,
        submitResult: {
          level: action.level,
          message: action.message,
        },
      };
    case types.SUBMIT_ERROR:
      return {
        ...state,
        submitResult: {
          level: action.level,
          message: action.message,
        },
      };
    default:
      return state;
  }
};

export default reducer;