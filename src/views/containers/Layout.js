import React from 'react';
import { connect } from 'react-redux';

import {
  actions as schedulesActions,
  selector as VisibleSchedulesSelector,
} from '../../states/schedules';
import {
  actions as progresses,
  selector as VisibleProgressesSelector,
} from '../../states/progresses';
import LayoutComponent from '../components/Layout';

const Layout = props => {

  React.useEffect(() => {
    props.loadPercentageProgresses(props.schedule.id);
    const timer = setInterval(() => {
      props.loadPercentageProgresses(props.schedule.id);
    }, 5000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LayoutComponent
      {...props}
    />
  );
};

const mapStateToProps = state => {
  const hasDate = Object.keys(state.dates).length > 0;
  const hasSchedule = Boolean(state.schedules.selected.id);
  const schedule = VisibleSchedulesSelector(state).selected;
  const date_str = hasDate ? state.dates[Object.keys(state.dates)[0]].date : '日付なし';

  return ({
    schedule: schedule,
    loggedIn: hasSchedule && hasDate,
    percentageProgresses: VisibleProgressesSelector(state).percentages,
    date_str : date_str,
  });
};

const mapDispatchToProps = {
  getSchedule: schedulesActions.get,
  loadPercentageProgresses: progresses.loadPercentage,
  handleClickLogout: schedulesActions.clear,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Layout);
