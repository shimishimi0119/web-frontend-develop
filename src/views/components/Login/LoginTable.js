import React from 'react'

import _ from 'lodash';

import classNames from "classnames";
import styled from 'styled-components';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { LoginContext } from '../../containers/Login';


const styles = theme => ({
  selected: {
    backgroundColor: '#d0fbe0',
  }
});

const StyledTableRow = styled(TableRow)`
  background-color: #3f51b5;
`;
const StyledNoDataTableRow = styled(TableRow)`
  background-color: pink;
`;
const StyledTableCell = styled(TableCell)`
  color: white;
`;


const columns = ['日付', '対象ソフトウェア', '作業区分', 'ノードタイプ', ''];

const dataExists = object => Object.keys(object).length > 0;

const LoginTableHead = () => (
  <TableHead>
    <StyledTableRow>
      {columns.map((column, index) => (
        <StyledTableCell key={index}>{column}</StyledTableCell>
      ))}
    </StyledTableRow>
  </TableHead>
);

const renderRows = (dates, handleDateIdChange, selectedDateId, classes) => {
  const handleClick = e => {
    handleDateIdChange(e.currentTarget.dataset.key);
  };

  return (_.map(dates, date => (
    <TableRow
      key={date.id}
      data-key={date.id}
      hover
      onClick={handleClick}
      // eslint-disable-next-line eqeqeq
      className={classNames({ [classes.selected]: selectedDateId == date.id })}
    >
      <TableCell>{date.date}</TableCell>
      <TableCell>{date.software.packageName}</TableCell>
      <TableCell>{date.workType}</TableCell>
      <TableCell>{date.software.nodeType}</TableCell>
      <TableCell>{date.isDone && '完了'}</TableCell>
    </TableRow>
  )))
};


const LoginTable = props => {
  const { classes } = props;
  const { dates, handleDateIdChange, selectedDateId } = React.useContext(LoginContext);

  return (
    <Table>
      <LoginTableHead />
      <TableBody>
        {dataExists(dates) ? renderRows(dates, handleDateIdChange, selectedDateId, classes) :
          <StyledNoDataTableRow>
            <TableCell colSpan={columns.length}>
              {'該当するスケジュールがありません。'}
            </TableCell>
          </StyledNoDataTableRow>
        }
      </TableBody>
    </Table>
  );
};

export default withStyles(styles)(LoginTable);
