import React from 'react'
import { KeyboardDatePicker } from '@material-ui/pickers';
import { LoginContext } from '../../containers/Login';


const LoginDatePicker = () => {
  const { pickedDate, handlePickedDateChange } = React.useContext(LoginContext);

  return (
    <KeyboardDatePicker
      autoOk
      // disableFuture
      variant="inline"
      format="yyyy-MM-dd"
      margin="normal"
      label="作業日"
      value={pickedDate}
      onChange={handlePickedDateChange}
    />
  );
};

export default LoginDatePicker;