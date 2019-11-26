import React, { useContext } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { NoticesContext } from '../../containers/Notices';
import NoticesContent from './NoticesContent';


const NoticesComponent = () => {
  const { closeNotice, notices } = useContext(NoticesContext);
  const { anchorOrigin, autoHideDuration, level, message, open } = notices;

  return (
    <Snackbar
      anchorOrigin={anchorOrigin}
      autoHideDuration={autoHideDuration}
      onClose={closeNotice}
      open={open}
    >
      <NoticesContent
        message={message}
        onClose={closeNotice}
        variant={level}
      />
    </Snackbar>
  );
};

export default NoticesComponent;

