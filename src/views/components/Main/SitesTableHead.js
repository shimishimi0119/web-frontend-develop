import React from 'react';
import _ from 'lodash';

import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { headerStyles } from './TableStyle';

const siteColumns = {};

siteColumns.site = {
  L: ['', 'Batch', 'eNBID', 'RNCID', 'WBTSID'],
  W: ['', 'Batch', 'RNCID', 'WBTSID', 'eNBID'],
};

siteColumns.pre = {
  ACT: ['W_Cell', 'L_Cell', 'VerCheck', 'Comm', 'Alarm'],
  DL: ['W_Cell', 'L_Cell', 'VerCheck', 'Alarm'],
};

siteColumns.main = {
  ACT: ['Activate'],
  DL: ['Download'],
};

siteColumns.qhc = ['W_Cell', 'L_Cell', 'Alarm', 'TS'];

siteColumns.post = {
  ACT: ['Alarm', 'W_Cell', 'L_Cell', 'VerCheck', 'Comm', 'KPI'],
  DL: ['Alarm', 'W_Cell', 'L_Cell', 'VerCheck'],
};

const TableColumns = props => {
  const classes = headerStyles();
  return (
    <React.Fragment>
      {_.map(props.siteColumns, (value, index) => (
        <TableCell className={classes[props.opType || 'default']} key={index} align="center">
          {value}
        </TableCell>
      ))}
    </React.Fragment>
  );
};

const SitesTableHead = props => {
  const classes = headerStyles();
  return (
    <TableHead className={classes.thead}>
      <TableRow>
        <TableColumns siteColumns={siteColumns.site[props.nodeType]} />
        <TableColumns opType="pre" siteColumns={siteColumns.pre[props.workType]} />
        <TableColumns opType="main" siteColumns={siteColumns.main[props.workType]} />
        <TableColumns opType="qhc" siteColumns={siteColumns.qhc} />
        <TableColumns opType="post" siteColumns={siteColumns.post[props.workType]} />
      </TableRow>
    </TableHead>
  );
};

export default SitesTableHead;
