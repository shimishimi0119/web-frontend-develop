import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
// import Clock from './clock';
// import { syncDate } from '../../actions/clock';
import Typography from '@material-ui/core/Typography';
// import { parseTime } from '../../utils/dates';

const styles = theme => ({
  title: {
    fontWeight: 'bold',
    borderBottom: 'solid 1px silver',
  },
});

class ContentTitle extends React.Component {
  // componentDidMount = () => {
  //   this.timer = setInterval(this.props.getDate, 1000);
  // };

  // componentWillUnmount = () => {
  //   clearInterval(this.timer);
  // };

  render() {
    const { classes } = this.props;
    // console.log("this.props=\n" + JSON.stringify(this.props, null, '  '));

    return (
      <Grid item xs={12}>
        <Typography variant="h5" className={classes.title} gutterBottom>
          {this.props.title}
          {/* <Clock {...this.props.time} /> */}
        </Typography>
      </Grid>
    );
  }
}

ContentTitle.propTypes = {
  classes: PropTypes.object.isRequired,
};

ContentTitle.defaultProps = {
  text: '-------------',
  // time: parseTime(),
};

// const mapStateToProps = state => {
//   return { time: state.clock.currentTime };
// };

// const mapDispatchToProps = dispatch => {
//   return { getDate: () => dispatch(syncDate()) };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ContentTitle));
export default connect(
  null,
  null
)(withStyles(styles)(ContentTitle));
