import React from 'react';
import _ from 'lodash';

import styled from 'styled-components';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { headerStyles } from './TableStyle'

// styled components

const StyledTableRow = styled(TableRow)`
border-top: solid 1px #AAAAAA;
&:first-child {
  border-top: none;
}
&:hover {
  background-color: #e3f2fd;
}
`

const StyledTableCell = styled(TableCell)`
height: 1.5em;
line-height: 1;
padding: 14px 8px 14px;
border-bottom: none;
`;

const StyledSpan = styled.span`
display: flex;
flex-direction: column;
height: 1.2em;
text-align: center;
`;

const kpiTableColumns = kpiType => {
  const columns = [
    'Batch',
    'Type',
    'RNC ID',
    'BTS ID',
    'Cell ID',
    'KPI名',
  ]
  switch(kpiType) {
    case "TS":
      return [...columns, '劣化タイプ'];

    case "Degrade":
    case "0Att":
    default:
      return [...columns, '時間', '前日値', '当日値', '閾値'];
  }
}

const TableColumns = props => {
  const classes = headerStyles();
  return (
    <React.Fragment>
      {_.map(props.kpiColumns, (value, index) => (
        <TableCell className={classes[props.opType || 'default']} key={index} align="center">
          {value}
        </TableCell>
      ))}
    </React.Fragment>
  );
};

const ListSpan = props => {
  return (
    <React.Fragment>
      {props.item.map((value, index) => (
        <StyledSpan key={index}>
          { `${value}(${index+1})` }
        </StyledSpan>
      ))}
    </React.Fragment>
  )
};
  
const KpiTable = props => {
  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableColumns kpiColumns={kpiTableColumns(props.kpiType)} />
        </TableRow>
      </TableHead>
      <TableBody>
        {_.map(props.kpi, (cellData, cellIndex) => (
          <StyledTableRow key={cellIndex}>
            <StyledTableCell align="center">{cellData.batch}</StyledTableCell>
            <StyledTableCell align="center">{cellData.nodeType}</StyledTableCell>
            <StyledTableCell align="center">{cellData.rncId}</StyledTableCell>
            <StyledTableCell align="center">{cellData.btsId}</StyledTableCell>
            <StyledTableCell align="center">{cellData.cellId}</StyledTableCell>
            <StyledTableCell align="center">{cellData.key}</StyledTableCell>
            {/^(?:DEGRADE|0ATT)$/.test(props.kpiType) && (
              <React.Fragment>
                <StyledTableCell align="center">
                  <ListSpan item={cellData.time} />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <ListSpan item={cellData.yesterday} />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <ListSpan item={cellData.today} />
                </StyledTableCell>
                <StyledTableCell align="center">{cellData.threshold}</StyledTableCell>
              </React.Fragment>
            )}
            {/^TS/.test(props.kpiType) && (
              <StyledTableCell align="center">{cellData.couse}</StyledTableCell>
            )}
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default KpiTable;