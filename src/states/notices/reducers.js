import { types } from './actions';
import { types as executesTypes } from '../executes/actions';
import { types as masterListsTypes } from '../masterLists/actions';
import { types as manualsTypes } from '../manuals/actions';


export const initialState = {
  anchorOrigin: {
    horizontal: 'right',
    vertical: 'bottom',
  },
  autoHideDuration: 5000,
  level: 'info',
  message: '',
  open: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.OPEN:
    case executesTypes.INIT:
    case executesTypes.DO_EXECUTE:
    case executesTypes.PAUSE:
    case manualsTypes.EXECUTION:
    case masterListsTypes.SUBMIT:
      return { ...state, open: true, ...action };
    case types.CLOSE:
      return { ...state, open: false };
    default:
      return state;
  }
};

export default reducer;