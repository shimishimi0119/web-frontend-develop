import { types } from './actions';
import { types as schedulesTypes } from '../schedules';

const initialState = {
  atNow: 0,
  limit: 10,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case schedulesTypes.GET:
      return {
        ...state,
        atNow: action.response.data.failedSitesCount,
      };
    case types.SUBMIT:
      return state;
    default:
      return state;
  }
};

export default reducer;