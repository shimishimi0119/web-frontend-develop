import React from 'react';

import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    // display: 'flex',
    // flexWrap: 'wrap',
  },
  header3: {
    padding: '2px 3px 2px ',
    margin: '10px 1px 0px',
    color: '#494949',
    borderLeft: 'solid 5px #7bd4e6',
  },
}));

const AlarmSettingTables = props => {
  const classes = useStyles();
  return (
    <form className={classes.container} noValidate autoComplete="off">
      <h3 className={classes.header3}>静観アラーム</h3>
      <h3 className={classes.header3}>除外アラーム</h3>
      <h3 className={classes.header3}>局断アラーム</h3>
      <h3 className={classes.header3}>TSSkip判定アラーム</h3>
      <h3 className={classes.header3}>名称変更アラーム</h3>
    </form>
  );
};

export default AlarmSettingTables;