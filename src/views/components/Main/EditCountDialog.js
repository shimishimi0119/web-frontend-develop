import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import { FormControlLabel } from '@material-ui/core';
import { renderTextField } from '../utils/renderFormFields';


const validate = values => {
  const errors = {}
  const requiredFields = [
    'newFailedSitesCount',
  ]

  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = '入力してください。'
    }
  })

  return errors
}


const EditCountDialog = props => {
  const { pristine, submitting, invalid } = props;

  const [unlock, setUnlock] = React.useState(false);
  const handleClick = () => {
    setUnlock(!unlock);
  };

  const handleClickSubmit = values => {
    setUnlock(false);
    props.handleClose();
    props.handleSubmit(values);
  };

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      maxWidth="xs"
    >
      <DialogTitle id="alert-dialog-title">
        {"局断数変更"}
      </DialogTitle>

      <form onSubmit={""}>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography display="block" variant="overline">
              累積局断数を変更します。
            </Typography>
            <Typography display="block" variant="caption">
              ※差分を算出して反映させるため、カウントが入力値とずれてしまうことがあります。
            </Typography>
          </DialogContentText>

          <Field
            name="newFailedSitesCount"
            label="変更後の累積局断数"
            component={renderTextField}
            type="number"
            required
          />

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
            color="primary"
            disabled={pristine || submitting || invalid || !unlock}
          >
            変更
          </Button>
          <Button onClick={props.handleClose}>
            キャンセル
          </Button>
        </DialogActions>
      </form>

    </Dialog>
  );
};


export default reduxForm({
  form: 'editCount',
  validate,
})(EditCountDialog);