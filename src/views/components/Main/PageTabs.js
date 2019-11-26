import React from 'react';
import _ from 'lodash';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import BatchesTable from './BatchesTable';
import KpiTable from './KpiTable';
import SitesTable from './SitesTable';
import StationTable from './StationTable';


const TabContainer = props => (
  <Typography component="div" style={{ padding: 8 * 1 }}>
    {props.children}
  </Typography>
);


const PageTabs = props => {
  const [page, setPage] = React.useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  const isWorkTypeDownload = props.date.workType === "DL";
  const startPageNum = isWorkTypeDownload ? 2 : 5;

  // batchesProgressesはALLのためALL以降を取得
  const eachBatchProgresses = _.filter(props.batchesProgresses, batchArray => batchArray[0] !== 'ALL');

  // KPI判定結果データ
  let kpiData = props.kpi[0];
  if (!kpiData) kpiData = {kpiDegrade: [], zeroAttempt: []};
  const degradeData = kpiData.kpiDegrade.filter(data => data.isKpiDegrade);
  const zeroAttData = kpiData.zeroAttempt.filter(data => data.isZeroAtt);


  // const kpiData = Object.assign({}, props.kpi[0]);
  // const degradeData = _.filter(kpiData.kpiDegrade, data => data.isKpiDegrade);
  // const zeroAttData = _.filter(kpiData.zeroAttempt, data => data.isZeroAtt);
  const tmpDegradeData = degradeData.filter(data => data.didTroubleShoot).map(data => ({...data, couse: "KPI劣化"}));
  const tmpZeroAttData = zeroAttData.filter(data => data.didTroubleShoot).map(data => ({...data, couse: "0 Attempt"}));
  const troubleShootData = [...tmpDegradeData, ...tmpZeroAttData];

  return (
    <>
      <AppBar position="static" color="default">

        {/* TabsBar */}
        <Tabs
          value={page}
          onChange={handleChangePage}
          indicatorColor="secondary"
          variant="scrollable"
          scrollButtons="auto"
          style={{background: '#3f51b5', color: 'white'}}
        >
          {/* page=0 */}
          <Tab label="全体進捗" />
          {/* page=x
          <Tab label="詳細" />*/}
          {/* page=1 */}
          <Tab label="作業集計" />

          {/* 作業がDLの場合、KPIタブを非表示にする。 */}
          {/* page=2 */}
          {!isWorkTypeDownload && <Tab label="KPI" />}
          {/* page=3 */}
          {!isWorkTypeDownload && <Tab label="0ATT" />}
          {/* page=4 */}
          {!isWorkTypeDownload && <Tab label="KPI-TS" />}

          {/* Batchの数だけTab追加 batch0はALLなので何もしない*/}
          {_.map(eachBatchProgresses, (batchArray, index) => <Tab key={index} label={`Batch ${batchArray[0]}`} />)}
        </Tabs>
      </AppBar>

      {/* BatchesBar */}
      {/* <StyledBatchTabs
        value={batch}
        onChange={handleChangeBatch}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto"
      >
        <StyledBatchTab label="All" />
        <StyledBatchTab label="1st" />
        <StyledBatchTab label="2nd" />
        <StyledBatchTab label="3rd" />
        <StyledBatchTab label="4th" />
        <StyledBatchTab label="5th" />
        <StyledBatchTab label="6th" />
        <StyledBatchTab label="7th" />
        <StyledBatchTab label="8th" />
        <StyledBatchTab label="9th" />
        <StyledBatchTab label="10th" />
      </StyledBatchTabs> */}

      {page === 0 && <TabContainer>
        <BatchesTable
          workType={props.date.workType}
          batches={props.batchesProgresses}
        />
      </TabContainer>}

      {/*page === 1 && <TabContainer>
        <SitesTable
          nodeType={props.date.software.nodeType}
          workType={props.date.workType}
          sites={props.sitesProgresses}
        />
      </TabContainer>*/}

      {page === 1 && <TabContainer>
        <StationTable
          station={props.station}
        />
      </TabContainer>}

      {page === 2 && !isWorkTypeDownload && <TabContainer>
        <KpiTable
          kpiType={"DEGRADE"}
          kpi={degradeData}
        />
      </TabContainer>}

      {page === 3 && !isWorkTypeDownload && <TabContainer>
        <KpiTable
          kpiType={"0ATT"}
          kpi={zeroAttData}
        />
      </TabContainer>
      }

      {page === 4 && !isWorkTypeDownload && <TabContainer>
        <KpiTable
          kpiType={"TS"}
          kpi={troubleShootData}
        />
      </TabContainer>
      }

      {/* 単体バッチの詳細タブ batch0はALLなので何もしない */}
      {_.map(eachBatchProgresses, (batchArray, index) => {
        const pageNum = startPageNum + index;
        /* batch番号でsitesの中身をフィルタ */
        const filteredSites = _.filter(props.sitesProgresses, site => site[1] === batchArray[0]);

        return (
          <div key={index}>
            {page === pageNum && <TabContainer>
              <SitesTable
                nodeType={props.date.software.nodeType}
                workType={props.date.workType}
                sites={filteredSites}
              />
            </TabContainer>}
          </div>
        );
      })}
    </>
  );
};

export default PageTabs;