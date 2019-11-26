import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import PropertySettingTables from './PropertySettingTables';
import AlarmSettingTables from './AlarmSettingTables';
import KpiSettingTables from './KpiSettingTables';

const TabContainer = props => (
  <Typography component="div" style={{ padding: 8 * 1 }}>
    {props.children}
  </Typography>
);

const SettingTabs = props => {
  const [page, setPage] = React.useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <React.Fragment>
      <AppBar position="static" color="default">
        <Tabs
          value={page}
          onChange={handleChangePage}
          indicatorColor="secondary"
          variant="scrollable"
          scrollButtons="auto"
          style={{background: '#3f51b5', color: 'white'}}
        >
          {/* page=0 */}
          <Tab label="共通設定" />
          {/* page=1 */}
          <Tab label="Alarm" />
          {/* page=2 */}
          <Tab label="KPI" />
        </Tabs>
      </AppBar>
      <TabContainer>
        {page === 0 && <PropertySettingTables />}
        {page === 1 && <AlarmSettingTables />}
        {page === 2 && <KpiSettingTables />}
      </TabContainer>
    </React.Fragment>
  );

};

export default SettingTabs;