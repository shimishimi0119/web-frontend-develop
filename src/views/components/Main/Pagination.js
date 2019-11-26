import React from 'react';

import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyle = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyle();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = e => {
    onChangePage(e, 0);
  };

  const handleBackButtonClick = e => {
    onChangePage(e, page - 1);
  };

  const handleNextButtonClick = e => {
    onChangePage(e, page + 1);
  };

  const handleLastPageButtonClick = e => {
    onChangePage(e, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

const Pagination = props => {

  const handleChangePage = (e, newPage) => {
    props.handleChangePage(newPage);
  };

  const handleChangeRowsPerPage = e => {
    props.handleChangeRowsPerPage(parseInt(e.target.value, 10));
    props.handleChangePage(0);
  };

  return (
    <Table>
      <TableFooter>
        <TableRow style={{background: '#eeeeee'}}>
          <TablePagination
            rowsPerPageOptions={[5, 20, 50, 100]}
            colSpan={3}
            count={props.count}
            rowsPerPage={props.rowsPerPage}
            page={props.page}
            SelectProps={{
              inputProps: { 'aria-label' : 'rows per page' },
              native: false,
            }}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActions}
          />
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default Pagination;