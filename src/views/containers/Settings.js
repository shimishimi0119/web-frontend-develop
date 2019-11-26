import React from 'react';
import { connect } from 'react-redux';

import SettingsComponent from '../components/Settings'

export const SettingsContext = React.createContext();

const Settings = props => {

  const { loggedIn } = props;
  const [settingsState, setSettingsState] = React.useState({
    open: false,
    disabled: true,
  });

  const handleSettingButtonOnClick = async () => {
    setSettingsState({
      ...settingsState,
      open: true,
    });
  };

  const handleSettingDialogOnClose = async () => {
    setSettingsState({
      ...settingsState,
      open: false,
    });
  };

  const handleSwitchToggle = async () => {
    setSettingsState({
      ...settingsState,
      disabled: !settingsState.disabled,
    });
  };

  return (
    <SettingsContext.Provider value={{
      loggedIn,
      settingsState,
      handleSettingButtonOnClick,
      handleSettingDialogOnClose,
      handleSwitchToggle,
    }}>
      <SettingsComponent />
    </SettingsContext.Provider>
  );
}

const mapStateToProps = state => {
  const hasDate = Object.keys(state.dates).length > 0;
  const hasSchedule = Boolean(state.schedules.selected.id);
  return ({
    loggedIn: hasSchedule && hasDate,
  });
};

const mapDispatchToProps = {

};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Settings);