import { createSelector } from 'reselect';
// import { types } from './actions';
import { types as schedulesTypes } from '../schedules';


const visibilityFilterSelector = state => state.visibilityFilter;
const failedSitesCountsSelector = state => state.failedSitesCounts;


const selector = createSelector(
  [visibilityFilterSelector, failedSitesCountsSelector],
  (visibilityFilter, failedSitesCounts) => {
    switch (visibilityFilter) {
      case schedulesTypes.GET:
      default:
        return failedSitesCounts;
    }
  }
);


export default selector;