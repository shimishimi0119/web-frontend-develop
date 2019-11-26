import React, { Component } from 'react';
// import PropTypes from 'prop-types'
import { zeroPaddingLeft } from '../../utils/strings';
// import { parseTime } from '../../utils/date'

class Clock extends Component {
  render() {
    let { hour, minutes, seconds } = this.props;
    console.log(this.props);
    hour = zeroPaddingLeft(hour);
    minutes = zeroPaddingLeft(minutes);
    seconds = zeroPaddingLeft(seconds);

    return (
      <span className="clock__time" style={{ float: 'right' }}>
        {hour}:{minutes}:{seconds}
      </span>
    );
  }
}

// Clock.PropTypes = {
//   hour   : PropTypes.isRequired,
//   minutes: PropTypes.isRequired,
//   seconds: PropTypes.isRequired,
// };

// Clock.defaultProps = {
//   time: parseTime()
// };

export default Clock;
