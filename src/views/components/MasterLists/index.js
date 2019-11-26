import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';
import ContentTitle from '../utils/ContentTitle';
import UploadForm from './UploadForm';
import AlertDialog from "./ResultDialog";

const useStyles = makeStyles({
  div: {
    minWidth: 350,
    boxSizing: 'border-box',
  },
});

const MasterListsComponent = props => {
  const classes = useStyles();
  const marginLeft = props.loggedIn ? 240 : 0;

  return (
    <Grid container spacing={3} justify="center">
      <Grid item xs={9}>
        <div className={classes.div} style={{marginLeft}}>
          <ContentTitle title="MasterListアップロード" />
          <UploadForm
            softwares={props.softwares}
            onSubmit={props.submitForm}
            masterLists={props.masterLists}
            history={props.history}
            submitSoftware={props.submitSoftware}
          />
          <AlertDialog {...props} />
        </div>
      </Grid>
    </Grid>
  );
};

export default MasterListsComponent;
