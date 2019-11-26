import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import ContentHeader from './ContentHeader';
import PageTabs from './PageTabs';
import EditCountDialog from './EditCountDialog';

const useStyles = makeStyles({
  div: {
    marginLeft: 240,
    maxWidth: '100%',
    boxSizing: 'border-box',
  },
});

const MainComponent = props => {
  const classes = useStyles();
  const [openModalEditCount, setOpenModalEditCount] = React.useState(false);

  const handleClickOpenModalEditCount = () => {
    setOpenModalEditCount(true);
  };

  const handleCloseModalEditCount = () => {
    setOpenModalEditCount(false);
  };

  return (
    <Paper className={classes.div}>

        <ContentHeader
          date={props.date}
          schedule={props.schedule}
          failedSitesCount={props.failedSitesCount}
          handleClick={handleClickOpenModalEditCount}
        />

        <PageTabs
          date={props.date}
          schedule={props.schedule}
          batchesProgresses={props.batchesProgresses}
          sitesProgresses={props.sitesProgresses}
          kpi={props.kpi}
          station={props.station}
        />

        <EditCountDialog
          open={openModalEditCount}
          handleClose={handleCloseModalEditCount}
          onSubmit={props.submitForm}
        />

    </Paper>
  );
};

export default MainComponent;
