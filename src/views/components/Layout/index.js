import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import Header from './Header';
// eslint-disable-next-line no-unused-vars
import Sidebar from './Sidebar';

const styles = theme => ({
  root: {
    // display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  toolbar: theme.mixins.toolbar,
});

const Layout = props => {
  const { classes } = props;

  return (
    <div className={classes.root}>

      {/* Header */}
      <Header {...props} />

      {/* Sidebar */}
      {props.loggedIn && null !== props.execStep && <Sidebar {...props} />}

      <main className={classes.content}>
        <div className={classes.toolbar} />

          {/* Component */}
          {props.children}

      </main>
    </div>
  );
};

export default withStyles(styles)(Layout);
