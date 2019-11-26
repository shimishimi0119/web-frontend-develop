import { createSelector } from 'reselect';
import { types } from './actions';


const visibilityFilterSelector = state => state.visibilityFilter;
const progressesSelector = state => state.progresses;


const selector = createSelector(
  [visibilityFilterSelector, progressesSelector],
  (visibilityFilter, progresses) => {
    switch (visibilityFilter) {
      case types.LOAD_BATCHES:
      case types.LOAD_SITES:
      case types.LOAD_PERCENTAGE:
      case types.LOAD_KPI:
      case types.LOAD_STATION:
      default:
        return progresses;
    }
  }
);


export default selector;
