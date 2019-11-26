import { types } from './actions';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case types.SUBMIT:
      return action.response.data;
    default:
      return state;
  }
};

export default reducer;