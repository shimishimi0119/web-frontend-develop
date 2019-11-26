import React from 'react';
import { makeStyles } from '@material-ui/styles';
import ContentTitle from '../utils/ContentTitle';
import SettingForm from './SettingForm';
import { SettingsContext } from '../../containers/Settings';

const useStyles = makeStyles({
  div: {
    minWidth: 850,
    boxSizing: 'border-box',
  },
});

const SettingsComponent = props => {
  const { loggedIn } = React.useContext(SettingsContext);
  const classes = useStyles();
  const marginLeft = loggedIn ? 240 : 0;
  return (
    <div className={classes.div} style={{marginLeft}}>
      <ContentTitle title="設定" />
      <SettingForm />
    </div>
  );
};

export default SettingsComponent;