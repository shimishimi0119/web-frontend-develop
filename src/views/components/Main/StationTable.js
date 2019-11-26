import React from 'react';

import styled from 'styled-components';
import Paper from '@material-ui/core/Table';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import { headerStyles, TableStyles } from './TableStyle'

// styled components
const InlineSpan = styled.span`
display: inline-block;
margin-right: 5px;
`;

const StyledTypography = styled(Typography)`
margin-top: 2px;
`;

const stationTableColumns = [
  'Batch',
  '対象局',
  '事前除外局',
  '作業局',
  '完了局',
  'WOT番号',
  'WOTステータス',
];


const TableColumns = props => {
  const classes = headerStyles();
  return (
    <>
      {props.stationColumns.map((data, index) => (
        <TableCell key={index} className={classes[props.opType || 'default']} align="center">
          {data}
        </TableCell>
      ))}
    </>
  );
};

const Wrapper = props => {
  return (
    <InlineSpan>
      <Chip size="small" label={props.label} component="div" style={{width: 110}} />
      <StyledTypography align="center" variant={props.variant}>
        {props.children}
      </StyledTypography>
    </InlineSpan>
  );
};

const StationTable = props => {
  const classes = TableStyles();
  const [maxHeight, setMaxHeight] = React.useState(700);

  React.useEffect(() => {
    setMaxHeight(window.innerHeight - 400);
    let queue = null;
    window.addEventListener('resize', () => {
      clearTimeout(queue);
      queue = setTimeout(() => {
        setMaxHeight(window.innerHeight - 400);
      }, 100);
      
    }, false);
    
    return () => window.removeEventListener('resize', setMaxHeight);
  }, []);

  const resultCnt = props.station.filter((val, index) => index === 0);
  const result = props.station.filter((val, index) => index !== 0);

  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        {resultCnt.map((data, index) => {
          const targetCnt = data.targetSite - data.excludeSite
          return (
            <Grid container key={index}>
              <Grid item xs>
                <Wrapper label="当日作業総数" variant="h6">
                  <span className={classes.span}>{data.targetSite}</span>
                </Wrapper>
              </Grid>

              <Grid item xs>
                <Wrapper label="除外局数" variant="h6">
                  <span className={classes.span}>{data.excludeSite}</span>
                </Wrapper>
              </Grid>

              <Grid item xs>
                <Wrapper label="作業対象局" variant="h6">
                  <span className={classes.span}>{targetCnt}</span>
                </Wrapper>
              </Grid>

              <Grid item xs>
                <Wrapper label="完了局数" variant="h6">
                  <span className={classes.span}>{data.finishSite}</span>
                </Wrapper>
              </Grid>
              <Grid item xs={7} />
            </Grid>
          );
        })}
      </Paper>
      <Paper className={classes.root}>
        <div className={classes.tableWrapper} style={{maxHeight}}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableColumns stationColumns={stationTableColumns} />
              </TableRow>
            </TableHead>
            <TableBody className={classes.tbody}>
              {result.map((data, index) => {
                const workTargetSite = data.targetSite - data.excludeSite
                return (
                  <TableRow key={index} className={classes.tbodyTr}>
                    <TableCell align="center">{data.batch}</TableCell>
                    <TableCell align="center">{data.targetSite}</TableCell>
                    <TableCell align="center">{data.excludeSite}</TableCell>
                    <TableCell align="center">{workTargetSite}</TableCell>
                    <TableCell align="center">{data.finishSite}</TableCell>
                    <TableCell align="center">{data.wotNo}</TableCell>
                    <TableCell align="center">{data.wotStatus}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </Paper>
  </React.Fragment>
  );
};

export default StationTable;