import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  paper: {
    height: 100,
  },
});

const InlinePaper = ({ column, value, classes }) => (
  <Grid item xs={6} sm={3}>
    <Paper spacing={2} className={classes.paper}>
      {column}: {value}
    </Paper>
  </Grid>
);

class ContentHeader extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <InlinePaper {...{ column: 'date', value: '2019-06-30', classes }} />
        <InlinePaper {...{ column: 'sw_ver', value: 'WBTS_TEST', classes }} />
        <InlinePaper
          {...{ column: 'work_type', value: 'Activation', classes }}
        />
        <InlinePaper {...{ column: 'node_type', value: 'LTE', classes }} />
      </React.Fragment>
    );
  }
}

ContentHeader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ContentHeader);
