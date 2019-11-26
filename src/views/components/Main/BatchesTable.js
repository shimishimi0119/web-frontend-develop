import React from 'react';
import _ from 'lodash';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import BatchesTableHead from './BatchesTableHead';
import { StatusIcon } from '../utils/StatusIcons';
import { TableStyles } from './TableStyle';

// custom components

const StatusCell = props => (
  <TableCell align="center">
    <StatusIcon status={props.status} />
    {props.status &&
      `(${props.excludedCount})`
    }
  </TableCell>
);

const BatchesTable = props => {
  const classes = TableStyles();
  const [maxHeight, setMaxHeight] = React.useState(700);

  React.useEffect(() => {
    setMaxHeight(window.innerHeight - 300);
    let queue = null;
    window.addEventListener('resize', () => {
      clearTimeout(queue);
      queue = setTimeout(() => {
        setMaxHeight(window.innerHeight - 300);
      }, 100);
      
    }, false);
    
    return () => window.removeEventListener('resize', setMaxHeight);
  }, []);

  return (
    <Paper className={classes.root}>
      <div className={classes.tableWrapper} style={{maxHeight}}>
        <Table size="small">
          <BatchesTableHead
            workType={props.workType}
          />
          <TableBody className={classes.tbody}>
            {_.map(props.batches, (batch, index) => {
              return (
                <TableRow key={index} className={classes.tbodyTr}>
                  <TableCell align="center">{batch[0]}</TableCell>
                  <TableCell align="center">{batch[1]}</TableCell>
                  <StatusCell status={batch[2]} excludedCount={batch[3]} />
                  <StatusCell status={batch[4]} excludedCount={batch[5]} />
                  <StatusCell status={batch[6]} excludedCount={batch[7]} />
                  {props.workType === 'ACT' && <StatusCell status={batch[8]} excludedCount={batch[9]} />}
                  <StatusCell status={batch[10]} excludedCount={batch[11]} />
                  <StatusCell status={batch[12]} excludedCount={batch[13]} />
                  <StatusCell status={batch[14]} excludedCount={batch[15]} />
                  <StatusCell status={batch[16]} excludedCount={batch[17]} />
                  <StatusCell status={batch[18]} excludedCount={batch[19]} />
                  <StatusCell status={batch[20]} excludedCount={batch[21]} />
                  <StatusCell status={batch[22]} excludedCount={batch[23]} />
                  <StatusCell status={batch[24]} excludedCount={batch[25]} />
                  <StatusCell status={batch[26]} excludedCount={batch[27]} />
                  {props.workType === 'ACT' && <StatusCell status={batch[28]} excludedCount={batch[29]} />}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </Paper>
  );
};

export default BatchesTable;