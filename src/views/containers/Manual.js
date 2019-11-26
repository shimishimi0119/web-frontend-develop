import React from 'react';
import { connect } from 'react-redux';
import { actions as manuals } from '../../states/manuals';
import { selector as VisibleSchedulesSelector } from '../../states/schedules';
import {
  actions as progresses,
  selector as VisibleProgressesSelector,
} from '../../states/progresses';
import ManualComponent from '../components/Manual';

export const ManualContext = React.createContext();

const Manual = props => {
  const { schedule, date, batchesProgresses, sitesProgresses, loadBatchesProgresses, loadSitesProgresses } = props;
  const [isExecuting, setIsExecuting] = React.useState(false);
  const timer = React.useRef();
  // console.log(sitesProgresses);
  React.useEffect(() => {
    loadBatchesProgresses(schedule.id);
    loadSitesProgresses(schedule.id);
    const timer = setInterval(() => {
      loadBatchesProgresses(schedule.id);
      loadSitesProgresses(schedule.id);
    }, 5000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const submitForm = values => {
    console.log(values);
    props.submitData(values);
    if (!isExecuting) {
      setIsExecuting(true);
      timer.current = setTimeout(() => {
        setIsExecuting(false);
      }, 3000);
    }
  };

  return (
    <ManualContext.Provider value={{
      schedule,
      date,
      batchesProgresses,
      sitesProgresses,
      loadBatchesProgresses,
      loadSitesProgresses,
      ownState: props.ownState,
      isExecuting,
    }}>
      <ManualComponent submitForm={submitForm} />
    </ManualContext.Provider>
  );
};

const mapStateToProps = state => {
  const schedule = VisibleSchedulesSelector(state).selected;
  return ({
    schedule,
    date: state.dates[schedule.date],
    batchesProgresses: VisibleProgressesSelector(state).batches,
    sitesProgresses: VisibleProgressesSelector(state).sites,
    ownState: {
      dates: state.dates,
      selected: state.schedules.selected,
    },
  });
};

const mapDispatchToProps = {
  submitData: manuals.submit,
  loadBatchesProgresses: progresses.loadBatches,
  loadSitesProgresses: progresses.loadSites,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Manual);
