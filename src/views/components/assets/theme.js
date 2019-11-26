import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { createMuiTheme } from '@material-ui/core/styles';
import {
  ThemeProvider as MaterialThemeProvider,
  StylesProvider,
} from '@material-ui/styles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { indigo } from '@material-ui/core/colors';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

export const theme = createMuiTheme({
  palette: {
    primary: indigo,
  },
  props: {
    MuiTextField: {
      variant: "outlined",
    },
  },
  typography: {
    button: {
      textTransform: "none",
    },
  },
});

export const StylesWrapper = props => (
  <StylesProvider injectFirst>
    <MaterialThemeProvider theme={theme}>
      <StyledThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          {props.children}
        </MuiPickersUtilsProvider>
      </StyledThemeProvider>
    </MaterialThemeProvider>
  </StylesProvider>
);