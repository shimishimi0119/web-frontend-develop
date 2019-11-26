import { blueGrey, orange, pink, lightBlue, yellow } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/styles';

export const headerStyles = makeStyles(theme => ({
  default: {
    backgroundColor: blueGrey[200],
    fontWeight: 'bold',
    padding: '14px 8px 14px',
    position: 'sticky',
    top: 0,
  },
  pre: {
    backgroundColor: lightBlue[100],
    fontWeight: 'bold',
    padding: '14px 8px 14px',
    position: 'sticky',
    top: 0,
  },
  main: {
    backgroundColor: orange[300],
    fontWeight: 'bold',
    padding: '14px 8px 14px',
    position: 'sticky',
    top: 0,
  },
  qhc: {
    backgroundColor: yellow[100],
    fontWeight: 'bold',
    padding: '14px 8px 14px',
    position: 'sticky',
    top: 0,
  },
  post: {
    backgroundColor: pink[200],
    fontWeight: 'bold',
    padding: '14px 8px 14px',
    position: 'sticky',
    top: 0,
  },
  thead: {
    align: 'center',
    height: '1em',
  },
}));

export const TableStyles = makeStyles(theme => ({
  paper: {
    margin: theme.spacing(2),
  },
  root: {
    width: '100%',
  },
  tableWrapper: {
    // maxHeight: 700,
    overflow: 'auto'
  },
  tbody: {
    overflow: 'auto',
  },
  thead: {
    align: 'center',
  },
  tbodyTr: {
    borderTop: 'solid 1px #AAAAAA',
    '&:first-child': {
      borderTop: 'none',
    },
    '&:hover': {
      backgroundColor: '#e3f2fd',
    },
  },
  span: {
    fontSize: '0.7em',
    fontWeight: 'normal',
  },
}));

