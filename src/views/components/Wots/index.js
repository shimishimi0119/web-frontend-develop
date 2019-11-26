import React from 'react';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import WotFormDialog from './WotFormDialog';

const WotsComponent = props => {

  return (
    <React.Fragment>
      <List>
        <ListItem dense>
          <Button variant="contained" color={props.wotState.color} fullWidth size="large" onClick={props.handleClickOpenDialog}>WOT: {props.wots.wotId || '未申請'}</Button>
        </ListItem>
      </List>
      <WotFormDialog
        {...props}
      />
    </React.Fragment>
  );
};

export default WotsComponent