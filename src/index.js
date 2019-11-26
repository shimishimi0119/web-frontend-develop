import React from 'react';
import ReactDOM from 'react-dom';
import { hijackEffects } from 'stop-runaway-react-effects';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import * as serviceWorker from './serviceWorker';
import configureStore from './states/store';
import App from './views/App';


console.log('[NODE_ENV]: ', process.env.NODE_ENV);
process.env.NODE_ENV !== 'production' && hijackEffects();


const history = createBrowserHistory();
const store = configureStore(history);
const persistor = persistStore(store);


ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);


serviceWorker.unregister();
