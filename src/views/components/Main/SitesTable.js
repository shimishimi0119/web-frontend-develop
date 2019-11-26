import React from 'react';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import SitesTableHead from './SitesTableHead';
import Pagination from './Pagination';
import { StatusIcon } from '../utils/StatusIcons';
import { TableStyles } from './TableStyle';

const StatusCell = props => {
  return (
    <TableCell align="center">
      <StatusIcon status={props.status} />
    </TableCell>
  );
};

const SitesTable = props => {
  const classes = TableStyles();
  const [maxHeight, setMaxHeight] = React.useState(630);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(50);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.sites.length - page * rowsPerPage);
  
  React.useEffect(() => {
    setMaxHeight(window.innerHeight - 380);
    let queue = null;
    window.addEventListener('resize', () => {
      clearTimeout(queue);
      queue = setTimeout(() => {
        setMaxHeight(window.innerHeight - 380);
      }, 100);
      
    }, false);
    
    return () => window.removeEventListener('resize', setMaxHeight);
  }, []);

  return (
    <Paper className={classes.root}>
      <div className={classes.tableWrapper} style={{maxHeight}}>
        <Table size="small">
          <SitesTableHead
            nodeType={props.nodeType}
            workType={props.workType}
          />
          <TableBody className={classes.tbody}>
            {props.sites.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((site, index) => {
              return (
                <TableRow key={index} className={classes.tbodyTr}>
                  <StatusCell status={site[0]} />
                  <TableCell align="center">{site[1]}</TableCell>
                  <TableCell align="center">{site[2]}</TableCell>
                  <TableCell align="center">{site[3]}</TableCell>
                  <TableCell align="center">{site[4]}</TableCell>
                  <StatusCell status={site[5]} />
                  <StatusCell status={site[6]} />
                  <StatusCell status={site[7]} />
                  {props.workType === 'ACT' && <StatusCell status={site[8]} />}
                  <StatusCell status={site[9]} />
                  <StatusCell status={site[10]} />
                  <StatusCell status={site[11]} />
                  <StatusCell status={site[12]} />
                  <StatusCell status={site[13]} />
                  <StatusCell status={site[20]} />
                  <StatusCell status={site[14]} />
                  <StatusCell status={site[15]} />
                  <StatusCell status={site[16]} />
                  <StatusCell status={site[17]} />
                  {props.workType === 'ACT' &&
                    <>
                      <StatusCell status={site[18]} />
                      <StatusCell status={site[19]} />
                    </>
                  }
                </TableRow>
              )
            })}
            {emptyRows > 0 && <TableRow><TableCell colSpan={6} /></TableRow>}
          </TableBody>
        </Table>
      </div>

      <Pagination
        page={page}
        rowsPerPage={rowsPerPage}
        count={props.sites.length}
        handleChangePage={setPage}
        handleChangeRowsPerPage={setRowsPerPage}
      />

    </Paper>
  );
};

export default SitesTable;