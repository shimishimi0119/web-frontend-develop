import React from 'react';
import styled from 'styled-components';

const AlertDialog = props => {

  const masterLists = props.masterLists;

  return (
    <StyledP>除外局数：{Object.keys(masterLists).length > 0 ? masterLists.data : 0}局</StyledP>
  )
}

const StyledP = styled.p`
margin-top: 30px;
padding-left: 30px;
font-weight: bold;
`

export default AlertDialog;