import React from 'react';
import { Field, reduxForm } from 'redux-form';

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import { renderTextField } from '../utils/renderFormFields';

import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles({
  nodeConfigGroup: {
    'margin-top': '30px',
  },
  swFields: {
    'margin-right': '15px',
  }
});

const NewSwDialog = props => {
  
  const { pristine, submitting, handleSubmit, reset } = props;

  // Software nodeType State
  // 片方のNEWSWフィールドに文字を入れたら　もう片方を無効化する
  const [nodeType, setNodeType] = React.useState('');
  const changeNodeType = (type, e) => {
    e.target.value.length !== 0 ? setNodeType(type) : setNodeType('');
  }

  const handleDialogClose = () => {
    reset();
    setNodeType('');
    props.handleClose();
  }
    
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      fullWidth={true}
      maxWidth='md'
    >
      <DialogTitle id="form-dialog-title">
        
        <Typography display="block" variant="h5" color="textPrimary">
          {"作業対象バージョン登録"}
         </Typography>
      </DialogTitle>
      <DialogContent>
      <form onSubmit={handleSubmit}>
           
           {/* SWパッケージ名 */}
           <Field
            name="packageName"
            label="SWパッケージ名"
            component={renderTextField}
            required
          />
          {/* WCDMA */}
          <RenderFields
            formNodeType='w'
            setNodeType={setNodeType}
            nodeType={nodeType}
            changeNodeType={changeNodeType}
          />
          {/* LTE */}
          <RenderFields
            formNodeType='l'
            setNodeType={setNodeType}
            nodeType={nodeType}
            changeNodeType={changeNodeType}
          />
          
          {/* エラー表示 */}
          {
            (() => {
              if(props.submitResult && props.submitResult.level === 'success') {
                return (
                  <DialogContentText>
                    <Typography display="block" variant="h6" color="textSecondary">
                    {props.submitResult.message}
                    </Typography>
                  </DialogContentText>
                );
              }
              if(props.submitResult && props.submitResult.level !== 'success') {
                  return (
                    <DialogContentText>
                      <Typography display="block" variant="h6" color="error">
                        {props.submitResult.message}
                        <p>パッケージ名、新規SWバージョンが登録済みか確認して下さい。</p>
                      </Typography>
                    </DialogContentText>
                  );
              }
            })()
          }

          {/* ボタン */}
           <DialogActions>
            <Button
                type='submit'
                color='primary'
                disabled={pristine || submitting}
            >
                OK
            </Button>
            <Button 
              onClick={handleDialogClose}
              disabled={submitting}
            >
                キャンセル
            </Button>
        </DialogActions>
      </form>
      </DialogContent>
    </Dialog>
  );
}

const RenderFields = props => {
    const classes = styles()
    const formNodeType = props.formNodeType;
    let node_type_str = '';
    const name_new_sw = formNodeType + 'NewSW';
    const name_active_sw = formNodeType + 'ActiveSW';
    const name_passive_sw = formNodeType + 'PassiveSW';
    const field_first_num = 1;
    const field_last_num = 3;

    if(formNodeType === 'w') {
        node_type_str = 'WCDMA';
    }else{
        node_type_str = 'LTE';
    }

    // nodeTypeに自身のformNodeTypeが入ってない、もしくは空ではないときにフィールドを無効化する
    const isDisabled = props.nodeType !== formNodeType && props.nodeType !== '';

    return(
        <div className={classes.nodeConfigGroup}>
          <DialogContentText>
            <Typography display="block" variant="h6" color="textPrimary">
            {node_type_str}
            </Typography>
          </DialogContentText>
            <DialogContent>
              <Field
                  name={name_new_sw}
                  label="New Software"
                  component={renderTextField}
                  onChange={(e) => props.changeNodeType(formNodeType, e)}
                  disabled={isDisabled}
              />
            </DialogContent>

            {/* Active Software*/}
            <DialogContent>
            {
              (() => {
              let list = [];
              for(let i=field_first_num; i<=field_last_num; i++) {
                const name = name_active_sw + i;
                const label = "Active Software" + i;
                list.push(
                  <Field
                    name={name}
                    label={label}
                    component={renderTextField}
                    className={classes.swFields}
                  />
                );
              }
              return list;
            })()
            }
            </DialogContent>

            {/* Passive Software*/}
            <DialogContent>
            {
              (() => {
              let list = [];
              for(let i=field_first_num; i<=field_last_num; i++) {
                const name = name_passive_sw + i;
                const label = "Passive Software" + i;
                list.push(
                  <Field
                    name={name}
                    label={label}
                    component={renderTextField}
                    disabled={isDisabled}
                    className={classes.swFields}
                  />
                );
              }
              return list;
            })()
            }
            </DialogContent>
          </div>
    );
}


export default reduxForm({
    form: 'newSw',
})(NewSwDialog);