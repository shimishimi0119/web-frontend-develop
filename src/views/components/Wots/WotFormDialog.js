import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import CloseIcon from '@material-ui/icons/Close';
import LinkOffIcon from '@material-ui/icons/LinkOff';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';

const WotFormDialog = props => {
  const useStyles = makeStyles((theme) => ({
    closeButton: {
      position: 'absolute',
      top: theme.spacing(1),
      right: theme.spacing(1),
    }
  }));
  const classes = useStyles();
  return (
    <Dialog open={props.wotState.open} onClose={props.handleClickCloseDialog} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title" onClose={props.handleClickCloseDialog}>WOT
      <IconButton aria-label="close" className={classes.closeButton} onClick={props.handleClickCloseDialog}><CloseIcon /></IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Typography variant="subtitle1" color="primary" gutterBottom>
          対象作業とWOT番号の紐付けを行います。
      </Typography>
        <Typography variant="overline" color="textPrimary" gutterBottom>
          ※B-worksに登録したWOT番号を入力してください。
      </Typography>
        <div>
          <FormControlLabel
            control={
              <Switch
                onClick={props.handleSwitchToggle}
                color="secondary"
                value="unlock"
              />
            }
            label="操作ロック解除"
          />
        </div>
        <TextField
          autoFocus
          value={props.wotState.edit ? props.wotState.wotId : props.wots.wotId || ''}
          margin="dense"
          id="wotId"
          label="WOT番号"
          type="text"
          fullWidth
          onChange={props.handleChangeTextWot}
          disabled={props.wotState.locked}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  onClick={props.handleClickDeleteWot}
                  disabled={props.wotState.locked}
                >
                  <LinkOffIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" fullWidth size="large" onClick={props.handleClickOpenWot} disabled={props.wotState.locked}>Open</Button>
        <Button variant="contained" color="secondary" fullWidth size="large" onClick={props.handleClickCloseWot} disabled={props.wotState.locked}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default WotFormDialog;