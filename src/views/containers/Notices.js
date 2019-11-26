import React from 'react';
import { connect } from 'react-redux';
import { actions } from '../../states/notices';
import NoticesComponent from '../components/Notices';


export const NoticesContext = React.createContext();

const Notices = props => {
  const { closeNotice, notices } = props;

  return (
    <NoticesContext.Provider value={{
      closeNotice,
      notices,
    }}>
      <NoticesComponent />
    </NoticesContext.Provider>
  );
};

const mapStateToProps = state => {
  return ({
    notices: state.notices,
  });
};

const mapDispatchToProps = {
  closeNotice: actions.close,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Notices);
