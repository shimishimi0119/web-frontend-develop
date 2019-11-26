import React from 'react';
import { connect } from 'react-redux';
import {
  actions as failedSitesCount,
  selector as VisibleFailedSitesCountsSelector,
} from '../../states/failedSitesCounts';
import {
  actions as schedules,
  selector as VisibleSchedulesSelector,
} from '../../states/schedules';
import {
  actions as progresses,
  selector as VisibleProgressesSelector,
} from '../../states/progresses';
import MainComponent from '../components/Main';


const Main = props => {

  React.useEffect(() => {
    props.getSchedule(props.schedule.id);
    const timer = setInterval(() => {
      props.getSchedule(props.schedule.id);
    }, 5000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    props.loadBatchesProgresses(props.schedule.id);
    props.loadSitesProgresses(props.schedule.id);
    props.loadKpi(props.schedule.id);
    props.loadStation(props.schedule.id);
    const timer = setInterval(() => {
      props.loadBatchesProgresses(props.schedule.id);
      props.loadSitesProgresses(props.schedule.id);
      props.loadKpi(props.schedule.id);
      props.loadStation(props.schedule.id);
    }, 5000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 局断数の変更
  const submitFailedSitesCount = values => {
    const before_count = props.failedSitesCount.atNow;
    const after_count = values.newFailedSitesCount;
    const diff = after_count - before_count;
    props.incrementFailedSitesCount({ value: diff, scheduleId: props.schedule.id });
  };

  return (
    <MainComponent
      {...props}
      submitForm={submitFailedSitesCount}
    />
  );
};


const mapStateToProps = state => {
  const schedule = VisibleSchedulesSelector(state).selected;
  return ({
    date: state.dates[schedule.date],
    schedule: schedule,
    failedSitesCount: VisibleFailedSitesCountsSelector(state),
    batchesProgresses: VisibleProgressesSelector(state).batches,
    sitesProgresses: VisibleProgressesSelector(state).sites,
    kpi: VisibleProgressesSelector(state).kpi,
    station: VisibleProgressesSelector(state).station,
  });
};

const mapDispatchToProps = {
  getSchedule: schedules.get,
  loadBatchesProgresses: progresses.loadBatches,
  loadSitesProgresses: progresses.loadSites,
  loadKpi: progresses.loadKpi,
  loadStation: progresses.loadStation,
  incrementFailedSitesCount: failedSitesCount.submit,
};


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);
