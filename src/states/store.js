import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import { rootReducer, preloadedState } from './reducers';

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const logger = createLogger({
  collapsed: true,
  diff: true,
});

const persistConfig = {
  key: 'nokia-web',
  storage,
  whitelist: [
    'dates',
    'schedules',
  ],
};

const configureStore = history => {
  const middlewares = [thunk, routerMiddleware(history), logger];
  const persistedReducer = persistReducer(persistConfig, rootReducer(history));

  return createStore(
    persistedReducer,
    preloadedState,
    compose(applyMiddleware(...middlewares))
  );
};

export default configureStore;
