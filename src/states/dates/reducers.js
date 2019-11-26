import _ from 'lodash';
import { types } from './actions';
import { types as schedulesTypes } from '../schedules';

const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD:
    case types.LOAD_ON_DATE:
      return _.mapKeys(action.response.data, 'id');
    case schedulesTypes.CLEAR:
      return initialState;
    default:
      return state;
  }
};

export default reducer;