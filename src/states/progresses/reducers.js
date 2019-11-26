import { types } from './actions';

const initialState = {
  batches: {},
  sites: {},
  percentages: {},
  kpi: {},
  station: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_BATCHES:
      const batches = action.response.data;
      return { ...state, batches };
    case types.LOAD_SITES:
      const sites = action.response.data;
      return { ...state, sites };
    case types.LOAD_PERCENTAGE:
      const percentages = action.response.data;
      return { ...state, percentages };
    case types.LOAD_KPI:
      const kpi = action.response.data;
      return { ...state, kpi };
    case types.LOAD_STATION:
      const station = action.response.data;
      return { ...state, station };
    default:
      return state;
  }
};

export default reducer;
