import React from 'react';
import { Switch, Redirect, Route, withRouter } from 'react-router';
import { StylesWrapper } from './components/assets/theme';
import { connect } from 'react-redux';
import { URL_SET, REGION_SET } from './components/assets/constants';
import Layout from './containers/Layout';
import Login from './containers/Login';
import Main from './containers/Main';
import Manual from './containers/Manual';
import MasterLists from './containers/MasterLists';
import Notices from './containers/Notices';
import Settings from './containers/Settings';


const Routes = ({ loggedIn }) => (
  <Route>

    <Switch>
      {/* Common */}
      <Route exact path={URL_SET.settings} component={Settings} />
      <Route exact path={URL_SET.masterLists} component={MasterLists} />
      {/* Authenticated */}
      {(() => loggedIn && (
        <Switch>
          <Route exact path={URL_SET.manual} component={Manual} />
          <Route path={URL_SET.root} component={Main} />
        </Switch>
      ))()}

      {/* Not Authenticated */}
      <Route exact path={URL_SET.login} component={Login} />
      <Redirect to={URL_SET.login} />

    </Switch>
  </Route>
);


const App = props => {
  const { loggedIn, headTitle } = props;
  document.title = headTitle;

  return (
    <StylesWrapper>
      <Layout>
        <Routes loggedIn={loggedIn} />
        <Notices />
      </Layout>
    </StylesWrapper>
  );
};


const mapStateToProps = state => {
  const TOOL_NAME = process.env.REACT_APP_TOOL_NAME;
  const hasDate = Object.keys(state.dates).length > 0;
  const hasSchedule = Boolean(state.schedules.selected.id);
  const region = String(state.schedules.selected.region);
  return ({
    loggedIn: hasSchedule && hasDate,
    headTitle: region ? REGION_SET[region] : TOOL_NAME,
  });
}

export default withRouter(connect(mapStateToProps, null)(App));