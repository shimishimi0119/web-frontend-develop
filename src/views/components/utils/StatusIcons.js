import React from 'react';

import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';
import CheckIcon from '@material-ui/icons/CheckCircleRounded';
import ErrorIcon from '@material-ui/icons/ErrorRounded';
import ClockIcon from '@material-ui/icons/AccessTimeRounded';


// styled components

const StyledCheckIcon = styled(CheckIcon)`
  font-size: 1rem;
`;

const StyledErrorIcon = styled(ErrorIcon)`
  font-size: 1rem;
`;

const StyledClockIcon = styled(ClockIcon)`
  font-size: 1rem;
`;


// custom components
export const DoneIcon = () => <StyledCheckIcon color="primary" />;
export const FailIcon = () => <StyledErrorIcon color="secondary" />;
export const RunningIcon = () => <CircularProgress color="inherit" size={15} thickness={6} />;
export const TimeoverIcon = () => <StyledClockIcon color="secondary" />;

export const StatusIcon = props => {
  switch (props.status) {
    case 'done':
      return <DoneIcon />;
    case 'failure':
      return <FailIcon />;
    case 'running':
      return <RunningIcon />;
    case 'timeover':
      return <TimeoverIcon />;
    default:
      return null;
  }
}