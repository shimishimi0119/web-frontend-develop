import React from 'react'
import { Field, reduxForm } from 'redux-form'
import _ from 'lodash';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress';
import { renderFileField , renderSelectField } from '../utils/renderFormFields';
import NewSwDialog from './SoftwareForm';

const StyledForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  padding: ${props => props.theme.spacing(2)};
`;

const StyledButton = styled(Button)`
  margin-top: 30px;
`;

const StyledCircularProgress = styled(CircularProgress)`
  margin: 0 auto;
`

const validate = values => {
  const errors = {}
  const requiredFields = [
    'software',
    'file',
  ]

  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = '選択してください。'
    }
  })

  return errors
}

const renderOptions = props => {
  return _.map(props.softwares, software => {
    // softwares.submitResultを避けるための分岐
    if(software.id){
      return (
      <option
        key={software.id}
        value={software.id}
      >
        {software.packageName}
      </option>
  )}});
};

const UploadForm = props => {
  const { handleSubmit, pristine, submitting, invalid } = props;

  // Software登録ダイアログ用State
  const [openModalNewSw, setOpenModalNewSw] = React.useState(false);

  const handleClickOpenModalNewSw = () => {
    setOpenModalNewSw(true);
  };

  const handleCloseModalNewSw = () => {
    setOpenModalNewSw(false);
  };

  const [isUploading, setIsUploading] = React.useState(false);

  React.useEffect(() => {
    if(props.masterLists.status) {
      setIsUploading(false);
    } else if (props.submitSucceeded) {
      setIsUploading(true);
    } else {
      setIsUploading(false);
    }
  }, [props.masterLists.status, props.submitSucceeded]);

  return (
    <Paper style={{ padding: 30, }}>
      <StyledForm
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <Field
          name="software"
          label="Target Software"
          component={renderSelectField}
          required
          disabled={submitting || isUploading}
        >
          <option value=""></option>
          {renderOptions(props)}
        </Field>

        <div align='right'>
          <Button
            variant="outlined"
            onClick={handleClickOpenModalNewSw}
            disabled={submitting || isUploading}
          >
            登録
          </Button>
        </div>

        <Field
          name="file"
          type="file"
          label="Master List"
          accept="text/csv"
          component={renderFileField}
          required
          disabled={submitting || isUploading}
        />

        <StyledButton
          type='submit'
          size='medium'
          variant='contained'
          color='primary'
          disabled={pristine || submitting || invalid || isUploading}
        >
        {isUploading ? <StyledCircularProgress color="inherit" /> : "アップロード"}
        </StyledButton>

      </StyledForm>
      <NewSwDialog
        open={openModalNewSw}
        handleClose={handleCloseModalNewSw}
        onSubmit={props.submitSoftware}
        submitResult={props.softwares.submitResult}
      />
    </Paper>
  )
};

export default reduxForm({
  form: 'masterListsUpload',
  validate,
})(UploadForm);