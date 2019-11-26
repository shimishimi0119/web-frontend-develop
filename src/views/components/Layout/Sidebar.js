import React from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import CheckIcon from '@material-ui/icons/CheckRounded';
import Typography from '@material-ui/core/Typography';

import Wots from '../../containers/Wots';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  nested: {
    paddingLeft: theme.spacing(6),
  },
  toolReadyStep: {
    backgroundColor: "#e0e0e0",
    opacity: 0.5,
    cursor: "default",
  },
  qhcStep: {
    backgroundColor: "#90caf9",
  },
  date: {
    fontWeight: 'bold',
  },
  toolbar: theme.mixins.toolbar,
}));


const StyledCircularProgress = styled(CircularProgress)({
  marginRight: "38px"
});

const StyledCircularBatch = styled(CircularProgress)({
  marginRight: "36px"
});

const StyledCheckIcon = styled(CheckIcon)({
  marginRight: "10px"
});


const PrePostProgressItem = props => (
  <ListItem dense key={props.index} className={props.className}>
    {
      props.step === "main" ? (
        <StyledCircularBatch size={20} thickness={6} variant="static" value={props.value} />
      ) : (
          <StyledCircularProgress size={20} thickness={6} variant="static" value={props.value} />
        )
    }
    <ListItemText primary={props.primary} />
  </ListItem>
)

const FinishedProgressItem = props => (
  <ListItem dense key={props.primary} className={props.className}>
    <ListItemIcon>
      <StyledCheckIcon color="primary" />
    </ListItemIcon>
    <ListItemText primary={props.primary} />
  </ListItem>
)

const Date = props => {
  const classes = useStyles();
  // -を2つ置換
  const date_str = props.date_str.replace(/-/g, '/');

  return (
    <List>
      <ListItem>
        <ListItemText primary={<Typography align='center' variant='h4' className={classes.date}>{date_str}</Typography>} />
      </ListItem>
    </List>
  );
}

const Sidebar = props => {
  const classes = useStyles();

  const state = {
    preOpen: true,
    mainOpen: true,
    postOpen: true,
  };

  const execStep = {
    pre: "pre",
    main: "main",
    post: "post"
  }

  const postMatchResult = (props.loggedIn 
    && null !== props.schedule.execStep
    && /POST/i.test(props.schedule.execStep));

  let preProgressItem = '';
  let mainAllProgressItem = '';
  let postProgressItem = '';
  let mainProgressItemList = [];

  const NO_PROGRESS = 0;
  const FINISHED = 100;

  const makePrePostProgress = (toolFinPer, step_index) => {
    switch (toolFinPer) {
      case FINISHED:
        return <FinishedProgressItem primary={step_index} />;
      case NO_PROGRESS:
        return <PrePostProgressItem className={classes.toolReadyStep} index={step_index} value={toolFinPer} primary={step_index} step={step_index} />;
      default:
        return <PrePostProgressItem index={step_index} value={toolFinPer} primary={step_index} step={step_index} />;
    }
  };

  if (props.percentageProgresses.pre) {
    preProgressItem = makePrePostProgress(props.percentageProgresses.pre.toolFinPer, execStep.pre);
  }
  if (props.percentageProgresses.post) {
    postProgressItem = makePrePostProgress(props.percentageProgresses.post.toolFinPer, execStep.post);
  }

  if (props.percentageProgresses.main) {
    const mainObj = props.percentageProgresses.main;

    if (postMatchResult || mainObj.toolFinPer === FINISHED) {
      mainAllProgressItem = <FinishedProgressItem primary={execStep.main} />;
    } else {
      mainAllProgressItem = <PrePostProgressItem index={execStep.main} value={mainObj.toolFinPer} primary={execStep.main} step={execStep.main} />;
    }

    mainProgressItemList = _.map(mainObj.batches, (batch, batchNumber) => {
      if (batch.toolFinPer === FINISHED) {
        if (batch.qhcFinPer === FINISHED) {
          return (<FinishedProgressItem key={batchNumber} className={classes.nested} primary={`Batch ${batchNumber}`} />)
        } else {
          return (<PrePostProgressItem key={batchNumber} className={`${classes.nested} ${classes.qhcStep}`} index={batchNumber} value={batch.qhcFinPer} primary={`Batch ${batchNumber} [QHC]`} step={execStep.main} />);
        }
      } else if (batch.toolFinPer === NO_PROGRESS) {
        return (<PrePostProgressItem key={batchNumber} className={`${classes.nested} ${classes.toolReadyStep}`} index={batchNumber} value={0} primary={`Batch ${batchNumber}`} step={execStep.main} />);
      } else {
        return (<PrePostProgressItem key={batchNumber} className={classes.nested} index={batchNumber} value={batch.toolFinPer} primary={`Batch ${batchNumber}`} step={execStep.main} />);
      }
    })
  }

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <div className={classes.toolbar} />

      <Date date_str={props.date_str}/>

      <Wots />

      <Divider />

      <List
        component="nav"
      >
        {/* pre */}
        {preProgressItem}
        {/* main */}
        {mainAllProgressItem}
        <Collapse in={state.mainOpen} timeout="auto" unmountOnExit>
          <List component="div">
            {mainProgressItemList}
          </List>
        </Collapse>
        {/* post */}
        {postProgressItem}
      </List>
    </Drawer>
  );
};

export default Sidebar;
