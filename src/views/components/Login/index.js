import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ContentTitle from '../utils/ContentTitle';
import LoginDatePicker from './LoginDatePicker';
import LoginTable from './LoginTable';
import LoginForm from './LoginForm';

const StyledPaper = styled(Paper)`
  padding: 2em;
`;

const LoginComponent = props => (
  <Grid container spacing={3} justify="center">
    <Grid item xs={12} lg={8}>
      <ContentTitle title="Login" />
      <StyledPaper>

        <LoginDatePicker />

        <LoginTable />

        <LoginForm />

      </StyledPaper>
    </Grid>
  </Grid>
);

export default LoginComponent;
