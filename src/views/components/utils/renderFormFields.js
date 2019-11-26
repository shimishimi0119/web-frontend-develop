import React from 'react';
import styled from 'styled-components';
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  InputLabel,
  Select,
  TextField,
} from '@material-ui/core';


const renderFormHelper = ({ touched, error }) => {
  const hasError = Boolean(error);
  let message = (touched && hasError) ? error : '';

  return <FormHelperText>{message}</FormHelperText>
}


export const renderTextField = ({
  input,
  label,
  meta: { touched, invalid, error },
  ...custom
}) => {
  const hasError = Boolean(error);

  return (
    <FormControl error={touched && hasError} margin="normal">
      <TextField
        label={label}
        placeholder={label}
        error={touched && invalid}
        helperText={touched && hasError}
        {...input}
        {...custom}
      />
    </FormControl>
  );
};


export const renderSelectField = ({
  input,
  label,
  meta: { touched, error },
  children,
  ...custom
}) => {
  const hasError = Boolean(error);

  return (
    <FormControl error={touched && hasError} margin="normal">
      <InputLabel htmlFor={input.name}>{label}</InputLabel>
      <Select
        native
        {...input}
        {...custom}
      >
        {children}
      </Select>
      {renderFormHelper({ touched, error })}
    </FormControl>
  );
};


export const renderFileField = ({
  input: { value, name, onChange },
  label,
  meta: { touched, error },
  onFieldChange,
  buttonLabel,
  accept = '*',
  required = false,
  disabled,
}) => {
  const StyledInput = styled.input`
    display: none;
  `;

  const StyledButton = styled(Button)`
    margin-top: 10;
  `;

  const hasError = Boolean(error);

  return (
    <FormControl
      required={required}
      margin="normal"
      component='fieldset'
      error={touched && hasError}
    >
      <FormLabel component='legend'>{label}</FormLabel>
      <StyledInput
        accept={accept}
        id={name}
        type='file'
        onChange={e => {
          e.preventDefault()
          onChange(e.target.files[0])
          onFieldChange && onFieldChange(e.target.files[0])
        }}
        onBlur={() => { }}
        disabled={disabled}
      />
      <label htmlFor={name}>
        <StyledButton variant='outlined' component='span' disabled={disabled}>
          {buttonLabel || 'ファイルを選択'}
        </StyledButton>
      </label>
      <label>{value && value.name}</label>
      {(touched && hasError) && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  )
};