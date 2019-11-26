import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#607d8b',
    color: theme.palette.common.white,
    padding: '5px 10px',
    fontSize: 14,
  },
}));


const AlarmTableHead = props => {
  const classes = useStyles();
  const headerNames = [
    'No.', 'Object Class', 'Alarm Text', 'Supplementary Information', 'Diagnostic Info'
  ];
  return (
    <TableHead>
      <TableRow>
        {headerNames.map(head => <TableCell className={classes.root}>{head}</TableCell>)}
        <TableCell className={classes.root}>
          <Fab
            size="small"
            color="secondary"
            aria-label="Add"
            onClick={() => false}
          ><AddIcon /></Fab>
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default AlarmTableHead;