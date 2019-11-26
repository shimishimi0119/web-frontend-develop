import { createSelector } from 'reselect';
import { types } from './actions';


const visibilityFilterSelector = state => state.visibilityFilter;
const schedulesSelector = state => state.schedules;


const selector = createSelector(
  [visibilityFilterSelector, schedulesSelector],
  (visibilityFilter, schedules) => {
    switch (visibilityFilter) {
      case types.LOAD:
      case types.GET:
      default:
        return schedules;
    }
  }
);


export default selector;