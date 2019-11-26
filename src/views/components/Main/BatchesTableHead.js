import React from 'react';
import _ from 'lodash';

import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { headerStyles } from './TableStyle'

const batchColumns = {};

batchColumns.batch = ['Batch', '局数'];

batchColumns.pre = {
  ACT: ['W_Cell', 'L_Cell', 'VerCheck', 'Comm', 'Alarm'],
  DL: ['W_Cell', 'L_Cell', 'VerCheck', 'Alarm'],
};

batchColumns.main = {
  ACT: ['Activate'],
  DL: ['Download'],
};

batchColumns.qhc = ['W_Cell', 'L_Cell', 'Alarm'];

batchColumns.post = {
  ACT: ['Alarm', 'W_Cell', 'L_Cell', 'VerCheck', 'Comm'],
  DL: ['Alarm', 'W_Cell', 'L_Cell', 'VerCheck'],
};

const TableColumns = props => {
  const classes = headerStyles();
  return (
    <React.Fragment>
      {_.map(props.batchColumns, (value, index) => (
        <TableCell className={classes[props.opType || 'default']} key={index} align="center">
          {value}
        </TableCell>
      ))}
    </React.Fragment>
  );
};

const BatchesTableHead = props => (
  <TableHead>
    <TableRow>
      <TableColumns batchColumns={batchColumns.batch} />
      <TableColumns opType="pre" batchColumns={batchColumns.pre[props.workType]} />
      <TableColumns opType="main" batchColumns={batchColumns.main[props.workType]} />
      <TableColumns opType="qhc" batchColumns={batchColumns.qhc} />
      <TableColumns opType="post" batchColumns={batchColumns.post[props.workType]} />
    </TableRow>
  </TableHead>
);

export default BatchesTableHead;
