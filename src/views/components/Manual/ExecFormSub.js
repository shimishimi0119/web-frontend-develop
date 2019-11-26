import React from 'react';
import _ from 'lodash';
import { manualStyles } from './style';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { REGION_SET, WORK_TYPE } from '../assets/constants';

const Wrapper = props => {
  const classes = manualStyles();
  return (
    <Paper className={classes.subPaper}>
      <Chip className={classes.chip} size="small" label={props.label} component="div" />
      <Typography className={classes.subTypography} align="left" variant={props.variant}>
        {props.children}
      </Typography>
    </Paper>
  );
};

const ExecInformation = props => {
  const schedule = { ...props.ownState.selected };
  const workSet = props.ownState.dates[schedule.date];
  const itemMap = {
    'Software Version': workSet.software.packageName,
    '地域': REGION_SET[schedule.region],
    '作業サーバー': schedule.workServer,
    '作業区分': WORK_TYPE[workSet.workType],
    'Node Type': workSet.software.nodeType,
  };

  return (
    <Grid container justify="space-evenly">
    {
      _.map(itemMap, (val, key) => (
          <Grid item xs="auto" key={key}>
            <Wrapper label={key} variant="body1">
              {val}
            </Wrapper>
          </Grid>
      ))
    }
    </Grid>
  );
}

export default ExecInformation;