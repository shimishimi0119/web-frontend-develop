import React from 'react';
import { connect } from 'react-redux';

import { actions as softwares } from '../../states/softwares';
import { actions as masterLists } from '../../states/masterLists';
import MasterListsComponent from '../components/MasterLists';

const MasterLists = props => {
  React.useEffect(() => {
    props.loadSoftwares();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitForm = values => {
    props.clearMasterListsState();
    props.submitMasterLists(values);
  };

  return (
    <MasterListsComponent
      {...props}
      submitForm={submitForm}
    />
  );
};


const mapStateToProps = state => {
  const hasDate = Object.keys(state.dates).length > 0;
  const hasSchedule = Boolean(state.schedules.selected.id);
  return ({
    loggedIn: hasSchedule && hasDate,
    softwares: state.softwares,
    masterLists: state.masterLists,
  });
};

const mapDispatchToProps = {
  loadSoftwares: softwares.load,
  submitSoftware: softwares.submit,
  submitMasterLists: masterLists.submit,
  clearMasterListsState: masterLists.clear,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MasterLists);
