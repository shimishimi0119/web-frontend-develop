import React from 'react';
import { manualStyles } from './style';
import { ManualContext } from '../../containers/Manual';
import ExecInformation from './ExecFormSub'
import { Field, reduxForm } from 'redux-form'
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { renderSelectField, renderTextField } from '../utils/renderFormFields';

const number = value => value && (isNaN(Number(value)) ||
  Number(value) < 0) ? '0以上の半角数値で入力してください' : undefined;

const isNull = value => !value && '選択してください';

const validate = values => {
  /**
   * workPath   => 作業フォルダ
   * workServer => 対象サーバ
   * key        => Tool名
   * nodeType   => W/L
   * workType   => DL/ACT
   * batch      => batch番号
   * session    => session数
   * execStep   => PRE/MAIN/QHC/POST
   */
  const errors = {};
  let requiredFields = [];

  switch (values.key) {
    case 'swupload_swvercheck':
      requiredFields = ['workType', 'nodeType', 'execStep'];
      break;
    case 'get_commfile':
    case 'sitelist_exclude':
      requiredFields = ['execStep', 'nodeType'];
      break;
    case 'rnc_log_get':
    case 'enb_cell_status':
      requiredFields = ['execStep', 'nodeType', 'batch'];
      break;
    case 'upload_emergency_stop':
    case 'upload_restart':
    case 'upload_forced_quit':
      requiredFields = ['execStep'];
      break;
    case 'sitelist_get':
      break;
    case 'download':
    case 'provision':
      requiredFields = ['nodeType', 'batch', 'session'];
      break;
    default:
      break;
  }

  requiredFields = ['workPath', 'workServer', 'key', ...requiredFields];
  console.log(requiredFields);
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = '必須項目です！';
    }
  })

  return errors;
}


const ManualExecForm = props => {
  const classes = manualStyles();
  const { ownState, isExecuting } = React.useContext(ManualContext);
  const { pristine, submitting, invalid } = props;
  const [fieldNames, setFieldNames] = React.useState([]);

  React.useEffect(() => {
    let schedule = Object.assign({
      id: null,
      failedSitesCount: null
    }, ownState.selected);

    if (schedule && schedule.id) {
      const selected = ownState.selected;
      const workSet = ownState.dates[ownState.selected.date];
      props.initialize({
        workPath: selected.workPath,
        workServer: selected.workServer,
        nodeType: workSet.software.nodeType,
        workType: workSet.workType,
        execStep: selected.execStep,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ownState.selected]);

  const handleClickSelectTool = e => {
    // 選択したToolによって表示するフィールドを制御するための情報を保持
    var showFields = [];
    const toolName = e.target.value;
    console.log(toolName);
    switch (toolName) {
      case 'swupload_swvercheck':
        showFields = ['workType', 'nodeType', 'execStep'];
        break;
      case 'get_commfile':
      case 'sitelist_exclude':
        showFields = ['execStep', 'nodeType'];
        break;
      case 'rnc_log_get':
      case 'enb_cell_status':
        showFields = ['execStep', 'nodeType', 'batch'];
        break;
      case 'upload_emergency_stop':
      case 'upload_restart':
      case 'upload_forced_quit':
        showFields = ['execStep'];
        break;
      case 'download':
      case 'provision':
        showFields = ['nodeType', 'batch', 'session'];
        break;
      case 'sitelist_get':
      default:
        showFields = [];
    }

    setFieldNames(showFields);
  };

  return (
    <Paper className={classes.paper}>
      <ExecInformation ownState={ownState} />

      <form
        className={classes.form}
        onSubmit={props.handleSubmit}
      >

        <Field
          id="key"
          name="key"
          label="実行対象ツール"
          component={renderSelectField}
          onChange={handleClickSelectTool}
          disabled={isExecuting}
          required
        >
          <option value=""></option>
          <option value={'swupload_swvercheck'}>SWUpload</option>
          <option value={'rnc_log_get'}>WBTS Cell取得</option>
          <option value={'enb_cell_status'}>eNB Cell取得</option>
          <option value={'get_commfile'}>CommFile取得</option>
          <option value={'sitelist_get'}>SiteList生成</option>
          <option value={'sitelist_exclude'}>SiteList除外</option>
          <option value={'download'}>Download</option>
          <option value={'provision'}>Activation</option>
          <option value={'upload_emergency_stop'}>Upload緊急停止</option>
          <option value={'upload_restart'}>Upload再開</option>
          <option value={'upload_forced_quit'}>Upload強制終了</option>
        </Field>

        { fieldNames.includes('execStep') &&
          <Field
            id="execStep"
            name="execStep"
            label="実行ステップ"
            component={renderSelectField}
            disabled={isExecuting}
            validate={isNull}
            required
          >
            <option value=""></option>
            <option value="PRE">事前</option>
            <option value="MAIN">メイン（DL/ACT）</option>
            <option value="QHC">クイックヘルスチェック</option>
            <option value="POST">事後</option>
          </Field>
        }

        { fieldNames.includes('batch') &&
          <Field
            id="batch"
            name="batch"
            type="number"
            label="実行対象バッチ"
            component={renderTextField}
            disabled={isExecuting}
            validate={number}
            required
          />
        }

        { fieldNames.includes('session') &&
          <Field
            id="session"
            name="session"
            type="number"
            label="セッション数"
            component={renderTextField}
            disabled={isExecuting}
            validate={number}
            required
          />
        }
        
        {
          // isExecuting ?
          // <Button variant="contained" color="secondary">緊急停止</Button>
          // :
            <Button
              type='submit'
              size='medium'
              variant='contained'
              color='primary'
              className={classes.button}
              disabled={pristine || submitting || invalid || isExecuting}
            >
              実行 <PlayArrowIcon />
            </Button>
        }

      </form>

      {isExecuting &&
        <div className={classes.progress}>
          <LinearProgress />
        </div>
      }
    </Paper>
  );
}

export default reduxForm({
  form: 'manualExecForm',
  validate,
})(ManualExecForm);