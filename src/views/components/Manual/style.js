import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

export const manualStyles = makeStyles(theme => ({
  // ExcecForm用スタイル
  progress: {
    flexGrow: 1,
    marginTop: 2,
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    padding: theme.spacing(2),
  },
  button: {
    marginTop: '1em',
  },
  buttonMargin: {
    margin: '20px 20px',
    textAlign: 'right',
  },
  paper: {
    padding: '1em',
  },

  // ExcecFormSub用スタイル
  subPaper: {
    height: '70px',
    padding: '10px',
    marginBottom: '20px',
  },
  subTypography: {
    fontWeight: 'bold',
    padding: '0 1em',
    marginTop: '10px',
  },
  chip: {
    color: 'white',
    backgroundColor: green[800],
  },
}));

// Table用スタイル
export const tableStyles = makeStyles({
  root: {
    width: '100%',
  },
  0: {
    maxHeight: 600,
    overflow: 'auto',
  },
  tbody: {
    display: 'block',
    overflow: 'auto',
    height: 300,
  },
  thead: {
    backgroundColor: green[800],
    display: 'table',
    width: '100%',
    tableLayout: 'fixed',
  },
  TbodyTr: {
    display: 'table',
    width: '100%',
    tableLayout: 'fixed',
  },
  theadCell: {
    color: 'white',
    align: 'center',
  },
});

// Table用スタイル
export const progressDialogStyles = makeStyles({
  title: {
    backgroundColor: '#1e90ff',
    color: 'white',
  },
});