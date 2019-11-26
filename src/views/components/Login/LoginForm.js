import React from 'react';
import { Field, reduxForm } from 'redux-form';
import _ from 'lodash';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { LoginContext } from '../../containers/Login';
import { REGION_SET } from '../assets/constants';
import { renderTextField, renderSelectField } from '../utils/renderFormFields';


const StyledForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  padding: ${props => props.theme.spacing(2)};
`;

const StyledButton = styled(Button)`
  margin-top: 30px;
`;

const required = value => (value || typeof value === 'number' ? undefined : 'Required');
const number = value => value && (isNaN(Number(value)) ||
  Number(value) < 0) ? '0以上の半角数値で入力してください' : undefined;

const validate = values => {
  const errors = {}
  const requiredFields = [
    'scheduleId',
    'failedSitesCount',
  ]

  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = '選択してください。'
    }
  })

  return errors
}


const renderOptions = (dates, selectedDateId) => {
  if (Object.keys(dates).indexOf(selectedDateId) === -1) {
    return '';
  }

  const selectedData = Object.assign({}, dates[selectedDateId]);
  const schedules = selectedData.schedules;

  return _.map(schedules, schedule => (
    <option
      key={schedule.id}
      value={schedule.id}
    >
      {REGION_SET[schedule.region]}
    </option>
  ));
};


const LoginForm = props => {
  const { handleSubmit, invalid, pristine, submitting } = props;
  const { dates, handleScheduleChange, selectedDateId, selectedSchedule, submitForm } = React.useContext(LoginContext);

  React.useEffect(() => {
    let schedule = Object.assign({
      id: null,
      failedSitesCount: null
    }, selectedSchedule);

    props.initialize({
      scheduleId: schedule.id,
      failedSitesCount: schedule.failedSitesCount,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSchedule]);

  const handleSelectSchedule = e => {
    const newSchedule = dates[selectedDateId].schedules.find(schedule => schedule.id === Number(e.currentTarget.value));
    handleScheduleChange(newSchedule);
  };

  const isCountBlank = selectedDateId && selectedSchedule && selectedSchedule.id && selectedSchedule.failedSitesCount === null;

  return (
    <StyledForm
      onSubmit={handleSubmit(submitForm)}
    >

      <Field
        name="scheduleId"
        label="地域"
        component={renderSelectField}
        onChange={handleSelectSchedule}
        disabled={selectedDateId === null}
        required
      >
        <option value=""></option>
        {renderOptions(dates, selectedDateId)}
      </Field>

      {isCountBlank &&
        <Field
          name="failedSitesCount"
          label="累積局断数"
          component={renderTextField}
          // disabled={
          //   selectedDateId === null
          //   || selectedSchedule.id === null
          // }
          validate={[required, number]}
        />
      }

      <StyledButton
        type='submit'
        size='medium'
        variant='contained'
        color='primary'
        disabled={pristine || submitting || invalid}
      >
        ログイン
      </StyledButton>
    </StyledForm>
  )
};


export default reduxForm({
  form: 'login',
  validate,
})(LoginForm);