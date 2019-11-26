// import axios from 'axios';
import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
// import Fab from '@material-ui/core/Fab';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
// import ErrorIcon from '@material-ui/icons/Error';

import ExecStepCard from './ExecStepCard';
import { REGION_SET, WORK_TYPE } from '../assets/constants';
// import { Button } from '@material-ui/core';

const StyledCardHeader = styled(CardHeader)`
  padding: 3px;
`;

const StyledCardContent = styled(CardContent)`
  padding: 1.2em;
  &:last-child {
    padding-bottom: 1.0em;
  }
`;

const StyledPaper = styled(Paper)`
  height: 110px;
  padding: 10px;
  margin: 0px 10px 10px 10px;
`;

// const StyledCardTitle = styled(Typography)`
//   color: grey;
// `;

// const StyledSpanRed = styled.span`
//   color: red;
// `;

const StyledSpanOrange = styled.span`
  color: orange;
  font-weight: bold;
`;

const StyledSpanGreen = styled.span`
  color: green;
  font-weight: bold;
`;

const StyledSpanPink = styled.span`
  color: #c71585;
  font-weight: bold;
`;

const StyledSpanBold = styled.span`
  font-weight: bold;
`;

const StyledTypography = styled(Typography)`
  margin-top: 10px;
  word-wrap: break-word;
`
const Wrapper = props => (
  <StyledPaper>
    <Chip size="small" label={props.label} component="div" color="primary" />
    <StyledTypography align="center" variant={props.variant}>
      {props.children}
    </StyledTypography>
  </StyledPaper>
);

const ContentHeader = props => {
  return (
    <React.Fragment>
      <Grid container justify={"space-evenly"}>
        <Grid item xs="auto" md="auto" lg="auto">
          <Wrapper label="Software Version" variant="h6">
            <StyledSpanBold>
              {props.date ? props.date.software.packageName : 'NULL'}
            </StyledSpanBold>
          </Wrapper>
        </Grid>

        <Grid item xs="auto" md="auto" lg="auto">
          <Wrapper label="地域" variant="h6">
            <StyledSpanGreen>
              {REGION_SET[props.schedule.region]}
            </StyledSpanGreen>
          </Wrapper>
        </Grid>

        <Grid item xs="auto" md="auto" lg="auto">
          <Wrapper label="作業区分" variant="h6">
            <StyledSpanOrange>
              {props.date ? WORK_TYPE[props.date.workType] : 'NULL'}
            </StyledSpanOrange>
          </Wrapper>
        </Grid>

        <Grid item xs="auto" md="auto" lg="auto">
          <Wrapper label="作業サーバー" variant="h6">
            <StyledSpanGreen>
              {props.schedule.workServer}
            </StyledSpanGreen>
          </Wrapper>
        </Grid>

        <Grid item xs="auto" md="auto" lg="auto">
          <Wrapper label="ステータス" variant="h6">
            <StyledSpanPink>
              <ExecStepCard />
            </StyledSpanPink>
          </Wrapper>
        </Grid>

        <Grid item xs="auto" md="auto" lg="auto">
          <Card>
            <StyledCardHeader
              title={
                <Chip size="small" label="累積局断数" component="div" color="primary" />
              }
              action={
                <IconButton onClick={props.handleClick}>
                  <EditIcon />
                </IconButton>
              }
            />
            <StyledCardContent>
              <Typography
                variant="h3"
                component="p"
                align="center"
              >
                {props.failedSitesCount.atNow}
                {' / '}
                {props.failedSitesCount.limit}
              </Typography>
            </StyledCardContent>
          </Card>
        </Grid>

      </Grid>

    </React.Fragment>
  );
};

export default ContentHeader;