import React from 'react';
import { ManualContext } from '../../containers/Manual';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import InfoIcon from '@material-ui/icons/Info';

import BatchesTable from '../Main/BatchesTable';
import SitesTable from '../Main/SitesTable';


const TabPanel = props => {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
};

const a11yProps = index => {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  }
};

const TableTabs = () => {
  const { date, batchesProgresses, sitesProgresses } = React.useContext(ManualContext);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  return (
    <Paper>
      <Tabs
        value={value}
        indicatorColor='primary'
        textColor='primary'
        onChange={handleChange}
      >
        <Tab label="Batch Progress" icon={<ImportContactsIcon />} {...a11yProps(0)} />
        <Tab label="Node Progress" icon={<InfoIcon />} {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <BatchesTable
          workType={date.workType}
          batches={batchesProgresses}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SitesTable
          nodeType={date.software.nodeType}
          workType={date.workType}
          sites={sitesProgresses}
        />
      </TabPanel>
    </Paper>
  );
};

export default TableTabs;