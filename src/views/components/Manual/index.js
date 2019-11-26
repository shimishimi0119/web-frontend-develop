import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import ContentTitle from '../utils/ContentTitle';
import ExecForm from './ExecForm';
// import ProgressTableDialog from './ProgressDialog';

const useStyles = makeStyles({
  div: {
    marginLeft: 240,
    minWidth: 850,
    boxSizing: 'border-box',
  },
});

const ManualComponent = props => {
  const classes = useStyles();

  return (
    <div className={classes.div}>
      <Grid container spacing={3} justify="center">
        <Grid item xs={10}>
          <ContentTitle title="手動ツール実行" />
          <ExecForm onSubmit={props.submitForm} />
        </Grid>
        {/* <Grid item xs={10}>
          <ProgressTableDialog />
        </Grid> */}
      </Grid>
    </div>
  );
};

export default ManualComponent;

