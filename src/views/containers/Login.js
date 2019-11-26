import React from 'react';
import { connect } from 'react-redux';
import { format, subHours } from 'date-fns';

import { actions as dates } from '../../states/dates';
import { actions as executes } from '../../states/executes';
import LoginComponent from '../components/Login';


export const LoginContext = React.createContext();

const formatDate = date => format(date, 'yyyy-MM-dd');
const fixedDatetime = subHours(new Date(), 8);

const initialDate = formatDate(fixedDatetime);


const Login = props => {
  const { dates, loggedIn, loadDates, submitData } = props;

  const [pickedDate, setPickedDate] = React.useState(initialDate);
  const [selectedDateId, setSelectedDateId] = React.useState(null);
  const [selectedSchedule, setSelectedSchedule] = React.useState({});

  const submitForm = values => {
    submitData(values);
  };

  const handlePickedDateChange = date => {
    try {
      const formattedDate = formatDate(date);
      setPickedDate(formattedDate);
    } catch (e) {
      console.error('Date picking failed!', e);
    }
  }

  React.useEffect(() => {
    loadDates(pickedDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pickedDate]);

  const handleDateIdChange = React.useCallback(id => {
    setSelectedDateId(id);
    setSelectedSchedule({
      id: null,
      failedSitesCount: null,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDateId]);

  const handleScheduleChange = React.useCallback(schedule => {
    setSelectedSchedule(schedule);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSchedule]);

  return (
    <LoginContext.Provider value={{
      dates,
      handlePickedDateChange,
      handleDateIdChange,
      handleScheduleChange,
      loggedIn,
      pickedDate,
      selectedDateId,
      selectedSchedule,
      submitForm,
    }}>
      <LoginComponent />
    </LoginContext.Provider>
  );
};

const mapStateToProps = state => {
  const hasDate = Object.keys(state.dates).length > 0;
  const hasSchedule = Boolean(state.schedules.selected.id);
  return ({
    dates: state.dates,
    loggedIn: hasSchedule && hasDate,
  });
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadDates: date => dispatch(dates.loadOnDate(date)),
    submitData: values => dispatch(executes.init(values, ownProps)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);

