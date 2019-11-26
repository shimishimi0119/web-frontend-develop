import { types } from './actions';

const initialState = {};

const reducer = (state = initialState, action) => {
  let data = {};
  switch (action.type) {
    case types.WOTS_GET:
      try {
        data = action.response.data;
      } catch (e) {
        console.error(e);
      }
      return { ...data };
    case types.WOTS_OPEN:
    case types.WOTS_CLOSE:
      try {
        data = action.response.data.data || action.response.data;
      } catch (e) {
        console.error(e);
      }
      return { ...data };
    case types.WOTS_CREATE:
      return { ...action.response.data };
    case types.WOTS_DELETE:
      return { ...action.response.data };
    default:
      return state;
  }
};

export default reducer;