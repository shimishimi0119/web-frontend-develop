import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';

import { makeStyles } from '@material-ui/styles';

import { SettingsContext } from '../../containers/Settings';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 20,
    marginBottom: 10,
  },
  closeButton: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
  }
}));

const SettingExecButton = props => {
  const classes = useStyles();
  const { settingsState, handleSettingButtonOnClick, handleSettingDialogOnClose, handleSwitchToggle } = React.useContext(SettingsContext);
  return (
    <Typography className={classes.root}>
      <Button
        color="secondary"
        size="large"
        variant="contained"
        onClick={handleSettingButtonOnClick}
      >設定更新</Button>
      <Dialog
        open={settingsState.open}
        onClose={handleSettingDialogOnClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          設定更新
          <IconButton aria-label="close" className={classes.closeButton} onClick={handleSettingDialogOnClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText id="alert-dialog-description">
            設定更新してよろしいですか？
          </DialogContentText>
          <Paper elevation={0}>
            <FormControlLabel
              control={
                <Switch
                  onClick={handleSwitchToggle}
                  color="secondary"
                  value="unlock"
                />
              }
              label="操作ロック解除"
            />
        </Paper>
        </DialogContent>
        <DialogActions>
          <Button
            color="secondary"
            onClick={handleSettingDialogOnClose}
          >キャンセル</Button>
          <Button
            color="primary"
            disabled={settingsState.disabled}
            onClick={handleSettingDialogOnClose}
          >更新</Button>
        </DialogActions>
      </Dialog>
    </Typography>
  );
};

export default SettingExecButton;