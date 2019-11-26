import React from 'react';
import Paper from '@material-ui/core/Paper';

import SettingExecButton from './SettingExecButton';
import SettingTabs from './SettingTabs';

const SettingForm = props => {
  return (
    <React.Fragment>
      <SettingExecButton />
      <Paper>
        <SettingTabs />
      </Paper>
    </React.Fragment>
  );
};

export default SettingForm;