import React from 'react';
import { connect } from 'react-redux';
import { actions as wots } from '../../states/wots';


import WotsComponent from '../components/Wots';

const Wots = props => {
  // console.log('[Start]containers.Wots======');
  const { schedules: { selected: { id: scheduleId } }, wots } = props;
  const [wotState, setWotState] = React.useState({
    open: false,
    locked: true,
    edit: false,
    result: true,
    color: wots.wotId ? 'primary' : 'secondary',
    wotId: wots.wotId,
  });

  React.useEffect(() => {
    props.getWot(scheduleId).then(wot => {
      // console.log(wot);
      setWotState({
        ...wotState,
        color: wot.wotId ? 'primary' : 'secondary',
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickOpenDialog = async () => {
    // console.log('[Start]handleClickOpenDialog=======');
    let wot = await props.getWot(scheduleId);
    // console.log(wot);
    setWotState({
      ...wotState,
      open: true,
      locked: true,
      edit: false,
      color: wot.wotId ? 'primary' : 'secondary',
      wotId: wot.wotId,
    });
    // console.log('[Finish]handleClickOpenDialog=======');
  }
  const handleClickCloseDialog = async () => {
    // console.log('[Start]handleClickCloseDialog=======');
    let wot = await props.getWot(scheduleId);
    // console.log(wot);
    setWotState({
      ...wotState,
      open: false,
      locked: true,
      edit: false,
      color: wot.wotId ? 'primary' : 'secondary',
      wotId: wot.wotId,
    });
    // console.log('[Finish]handleClickCloseDialog=======');
  }
  const handleChangeTextWot = (event) => {
    // console.log('[Start]handleChangeTextWot=======');
    // console.log(wotState);
    let wotId = event.target.value.substring(0, 12);
    setWotState({
      ...wotState,
      edit: true,
      wotId
    });
    // console.log(wotState);
    // console.log('[Finish]handleChangeTextWot=======');
  };
  const handleClickOpenWot = async () => {
    // console.log('[Start]handleClickOpenWot=======')
    let { result, data = {}, description = 'WOT Openに成功しました。' } = await props.openWot(scheduleId, wotState.wotId);
    // console.log(data);
    // console.log(wotState);
    setWotState({
      ...wotState,
      edit: false,
      result,
      color: data.wotId ? 'primary' : 'secondary',
      wotId: data.wotId,
    });
    props.showNotice({
      level: result ? 'success' : 'error',
      message: description,
    });
    // console.log('[Finish]handleClickOpenWot=======')
  };
  const handleClickCloseWot = async () => {
    // console.log('[Start]handleClickCloseWot=======')
    let { result, data = {}, description = 'WOT Closeに成功しました。' } = await props.closeWot(scheduleId, wotState.wotId);
    setWotState({
      ...wotState,
      edit: false,
      result,
      color: data.wotId ? 'primary' : 'secondary',
      wotId: data.wotId,
    });
    props.showNotice({
      level: result ? 'success' : 'error',
      message: description,
    });
    // console.log('[Finish]handleClickCloseWot=======')
  };
  const handleClickDeleteWot = async () => {
    // console.log('[Start]handleClickDeleteWot=======');
    let { status } = await props.deleteWot(scheduleId);
    setWotState({
      ...wotState,
      edit: false,
      color: 'secondary',
      wotId: '',
    });
    props.showNotice({
      level: (200 < status && status < 300) ? 'success' : 'error',
      message: (200 < status && status < 300) ? 'WOT番号の紐付け解除に成功しました。' : 'WOT番号の紐付け解除に失敗しました。',
    });
    // console.log('[Finish]handleClickDeleteWot=======');
  };
  const handleSwitchToggle = () => {
    setWotState({
      ...wotState,
      locked: !wotState.locked,
    });
  };
  // console.log('[Finish]containers.Wots======');
  return (
    <WotsComponent
      {...props}
      wotState={wotState}
      handleClickOpenDialog={handleClickOpenDialog}
      handleClickCloseDialog={handleClickCloseDialog}
      handleChangeTextWot={handleChangeTextWot}
      handleClickOpenWot={handleClickOpenWot}
      handleClickCloseWot={handleClickCloseWot}
      handleClickDeleteWot={handleClickDeleteWot}
      handleSwitchToggle={handleSwitchToggle}
    />
  )
};

const mapStateToProps = state => {
  return ({
    schedules: state.schedules,
    wots: state.wots,
    notice: state.notice,
  });
};

const mapDispatchToProps = {
  getWot: wots.getWot,
  openWot: wots.openWot,
  closeWot: wots.closeWot,
  createWot: wots.createWot,
  deleteWot: wots.deleteWot,
  showNotice: wots.showNotice,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Wots);