import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { actions as executes } from '../../../states/executes';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { FormControlLabel } from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';

import { EXEC_STEP } from '../assets/constants';
import { Button } from '@material-ui/core';


const StyledButton = styled(Button)`
padding: 0 15px;
font-size: 1.25rem;
font-weight: bold;
&:nth-child(2) {
  margin-left: 20px;
}
`

const ExecuteButton = props => (
    <StyledButton
      variant="outlined"
      color={props.color}
      size="medium"
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.text}
    </StyledButton>
);

const ExecStepCard = props => {
  const [openModalForceExec, setOpenModalForceExec] = React.useState(false);
  const [isNextFinish, setIsNextFinish] = React.useState(false);

  const handleClickOpenModalForceExec = values => {
    values.finish ? setIsNextFinish(true) : setIsNextFinish(false);
    setOpenModalForceExec(true);
  };

  const handleCloseModalForceExec = () => {
    setOpenModalForceExec(false);
  };

  const [openModalForceProceed, setOpenModalForceProceed] = React.useState(false);

  const handleClickOpenModalForceProceed = () => {
    setOpenModalForceProceed(true);
  };

  const handleCloseModalForceProceed = () => {
    setOpenModalForceProceed(false);
  };

  const { doExecute, pauseExecute, schedule, isOverFailedCounts } = props;
  const { id, execStep, workDisabled } = schedule;

  const handleExecute = () => {
    isNextFinish ? doExecute({ scheduleId: id }) : doExecute({ scheduleId: id, execStep });
  };

  const handlePause = () => {
    pauseExecute({ scheduleId: id, execStep });
  };

  const workName = EXEC_STEP[execStep] ? EXEC_STEP[execStep] : 'なし';

  return (
    <React.Fragment>
      {workName}
      <div align='center'>
        {(() => {
          switch (execStep) {
            case 'PRE_WAIT':
            case 'MAIN_WAIT':
            case 'POST_WAIT':
              return (
                <React.Fragment>
                  <ExecuteButton
                    color="primary"
                    onClick={handleClickOpenModalForceExec}
                    disabled={isOverFailedCounts}
                    text="実行"
                  />
                  <ExecDialog
                    open={openModalForceExec}
                    close={handleCloseModalForceExec}
                    exec={handleExecute}
                  />
                </React.Fragment>
              );
            case 'PRE':
            case 'MAIN':
            case 'POST':
              return (
                <ExecuteButton
                  color="secondary"
                  onClick={handlePause}
                  disabled={workDisabled}
                  text="緊急停止"
                />
              );
            case 'PRE_PAUSED':
            case 'POST_PAUSED':
              return (
                <React.Fragment>
                  <ExecuteButton
                    color="primary"
                    onClick={handleClickOpenModalForceExec}
                    disabled={isOverFailedCounts}
                    text="再開"
                  />
                  <ExecuteButton
                    color="secondary"
                    onClick={() => handleClickOpenModalForceExec({finish:true})}
                    text="作業完了"
                  />
                  <ExecDialog
                    open={openModalForceExec}
                    close={handleCloseModalForceExec}
                    exec={handleExecute}
                  />
                </React.Fragment>
              );
            case 'MAIN_PAUSED':
              return (
                <React.Fragment>
                  <ExecuteButton
                    color="primary"
                    onClick={handleExecute}
                    disabled={isOverFailedCounts}
                    text="再開"
                  />
                  <ExecuteButton
                    color="secondary"
                    onClick={handleClickOpenModalForceProceed}
                    text="事後作業へ移行"
                  />
                  <ProceedPostDialog
                    open={openModalForceProceed}
                    handleClose={handleCloseModalForceProceed}
                    {...props}
                  />
                </React.Fragment>
              );
            default:
              return null;
          }
        })()}
      </div>
    </React.Fragment>
  );
};

const ExecDialog = props => {
  
  const handleClickSubmit = () => {
    props.exec();
    props.close();
  };

  return (
    <Dialog
      open={props.open}
      onClose={props.close}
    >
    <DialogTitle id="alert-dialog-title">実行確認</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Typography gutterBottom>本当に実行しますか？</Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button 
          type="submit"
          onClick={handleClickSubmit} 
          color="secondary"
          variant="contained"
        >
          Yes
        </Button>
        <Button 
          onClick={props.close} 
          color="primary"
          variant="contained"
        >
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const ProceedPostDialog = props => {
  const { pristine, submitting, invalid } = props;
  const [unlock, setUnlock] = React.useState(false);

  const handleClick = () => {
    setUnlock(!unlock);
  };

  const handleClickSubmit = values => {
    setUnlock(false);
    props.handleClose();
    props.doExecute({ scheduleId: props.schedule.id, execStep: props.schedule.execStep, force: true });
  };

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      maxWidth="xs"
    >
      <DialogTitle id="alert-dialog-title">
        事後作業へ移行
      </DialogTitle>

      <form onSubmit={""}>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography display="block" variant="overline" color="textPrimary">
              強制的に事後作業に移行します。
            </Typography>
          </DialogContentText>

          <div>
            <FormControlLabel
              control={
                <Switch
                  checked={unlock}
                  onClick={handleClick}
                  color="secondary"
                  value="unlock"
                />
              }
              label="ロック解除"
            />
          </div>

        </DialogContent>

        <DialogActions>
          <Button
            type="submit"
            onClick={handleClickSubmit}
            variant="contained"
            color="primary"
            disabled={pristine || submitting || invalid || !unlock}
          >
            OK
          </Button>
          <Button variant="contained" onClick={props.handleClose}>
            キャンセル
          </Button>
        </DialogActions>
      </form>

    </Dialog>
  );
};

const mapStateToProps = state => {
  const FAIL_COUNT_THRESHOLD = 10;
  return ({
    schedule: state.schedules.selected,
    isOverFailedCounts: parseInt(state.failedSitesCounts.atNow) >= FAIL_COUNT_THRESHOLD,
  });
};

const mapDispatchToProps = {
  doExecute: executes.doExecute,
  pauseExecute: executes.pause,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExecStepCard);
